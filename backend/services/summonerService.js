const axios = require('axios');
const { RateLimit } = require(`async-sema`);
const pool = require('../db')

const apiKey = 'RGAPI-081d119e-b5b3-4366-aafd-6230350f30bf';
const SEARCH_LIMIT_PER_SECOND = 20;
const SERACH_LIMIT_PER_2_MINUTES = 100;
const RETY_DELAY_BASE = 1000;

const rateLimitPerSecond = RateLimit(SEARCH_LIMIT_PER_SECOND, { timeUnit: 1000});
const rateLimitPer2Minuets = RateLimit(SERACH_LIMIT_PER_2_MINUTES, { timeUnit: 120000});


const performRequest = async (url) => {
    try {

        await rateLimitPerSecond();
        console.log(`Passed Seconds`);
        await rateLimitPer2Minuets();
        console.log(`Passed 2 minutes`);
        
        const response = await axios.get(url);
        console.log(`got response`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status == 429) {
            console.log(`Rate Limit exceeded. Retying in ${RETY_DELAY_BASE / 1000} seconds...`)
            await new Promise(resolve => setTimeout(resolve, RETY_DELAY_BASE));
            return performRequest(url);
        } else {
            throw new Error(`Failed to fetch data from API: ${error.message}`);
    
        }
    }
};

const getAccountInfo = async (region, summonerName) => {
    try {
        const [name, tagLine] = summonerName.split('-');
        const finalTagLine = tagLine || region;
        const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(finalTagLine)}?api_key=${apiKey}`;
        return await performRequest(url);
    } catch (error) {
        throw new Error(`Failed to fetch account information: ${error.message}`);
    }
};

const getSummonerInfo = async (region, regionTag, summonerName) => {
    try {
        const accountInfo = await getAccountInfo(region, summonerName);
        if (!accountInfo || !accountInfo.puuid) {
            throw new Error(`Failed to fetch summoner name`);
        }
        const puuid = accountInfo.puuid;

        const summonerDataFromDB = await checkSummonerExistence(puuid);
        if (summonerDataFromDB) {
            return await convertDBData(summonerDataFromDB)
        }
        const url = `https://${regionTag.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;
        const summonerInfo = await performRequest(url);
        const matches = await getMatches(puuid);
        const playerData = {
            accountInfo: accountInfo,
            summonerInfo: summonerInfo,
            matches: matches,
            updated: new Date()
        };
        console.log(playerData.updated);
        console.log("all data chieved now sqling");
        await insertSummonerData(accountInfo, summonerInfo, matches);
        
        return playerData;
    } catch (error) {
        throw new Error(`Failed to fetch summoner information: ${error.message}`);
    }
};

const checkSummonerExistence = async (puuid) => {
    try {
        const client = await pool.connect();
        console.log("Test");
        const query = 'SELECT * FROM summoner_info WHERE puuid = $1';
        const { rows } = await client.query(query, [puuid]);
        client.release();
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error(`Failed to check summontester existence in the database: ${error.message}`);
    }
};

const convertDBData = async (summonerData) => {
    const client = await pool.connect();

    try {
        const accountInfo = {
            gameName: summonerData.summoner_name,
            tagLine: summonerData.tag_line
        };
        const summonerInfo = {
            profileIconId: summonerData.profile_icon,
            summonerLevel: summonerData.summoner_level
        };

        const matches = await Promise.all(summonerData.match_ids.map(async (matchId) => {
            try {
                return await getMatchInfo(client, matchId);
            } catch (error) {
                // Handle error fetching match info for a specific match ID
                console.error(`Failed to fetch match info for match ID ${matchId}: ${error.message}`);
                return null; // Return null for the failed match
            }
        }));

        const filteredMatches = matches.filter(match => match !== null);

        return {
            accountInfo: accountInfo,
            summonerInfo: summonerInfo,
            matches: filteredMatches,
            updated: summonerData.last_updated
        };
    } finally {
        client.release();
    }
};

const getMatches = async (puuid) => {
    try {
        const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`;
        const matchIds = await performRequest(url);
        console.log(matchIds);
        const matchDetailsPromises = matchIds.map(async (matchId) => {
            const matchDetailUrl = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`;
            console.log(matchDetailUrl);
            return await performRequest(matchDetailUrl);
        });
        return await Promise.all(matchDetailsPromises);
    } catch (error) {
        throw new Error(`Failed to fetch matches: ${error.message}`);
    }
};


const insertSummonerData = async (accountInfo, summonerInfo, matches) => {
    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            console.log("adding summoner info");
            await insertSummonerInfo(client, accountInfo, summonerInfo, matches);
            console.log("done with summoner doing matches");
            await insertMatches(client, matches);
            console.log("Done now commiting");
            await client.query('COMMIT');
        } catch (error) {
            // Rollback the transaction if any error occurs
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        throw new Error(`Failed to insert summoner data into database: ${error.message}`);
    }
};

const insertSummonerInfo = async (client, accountInfo, summonerInfo, matches) => {
    const { puuid, gameName, tagLine,} = accountInfo;
    const { profileIconId, summonerLevel } = summonerInfo;
    // Check if the summoner already exists in the summoner_info table
    const getSummonerQuery = 'SELECT * FROM summoner_info WHERE puuid = $1';
    const { rows: existingSummonerRows } = await client.query(getSummonerQuery, [puuid]);

    if (existingSummonerRows.length > 0) {
        // Get the existing summoner data from the table
        const existingSummoner = existingSummonerRows[0];
        
        // Compare existing values with new values
        const updatedValues = {
            summoner_name: gameName || existingSummoner.summoner_name,
            tag_line: tagLine || existingSummoner.tag_line,
            profile_icon: profileIconId || existingSummoner.profile_icon,
            summoner_level: summonerLevel || existingSummoner.summoner_level,
        };

        const existingMatchIds = existingSummonerRows[0].match_ids || [];

        const newMatchIds = matches.map(match => match.match_id);

        const combinedMatchIds = [...new Set([...existingMatchIds, ...newMatchIds])];

        // Update the summoner_info table with the changed values
        const updateQuery = `
            UPDATE summoner_info
            SET summoner_name = $1, tag_line = $2, profile_icon = $3, summoner_level = $4, match_ids = $5
            WHERE puuid = $6
        `;
        await client.query(updateQuery, [
            updatedValues.summoner_name,
            updatedValues.tag_line,
            updatedValues.profile_icon,
            updatedValues.summoner_level,
            combinedMatchIds,
            puuid
        ]);
    } else {
        console.log("already exists!");
        // Insert new summoner data into the summoner_info table
        const matchIdsPromises = matches.map(async (match) => {
            const { platformId, gameId } = match.info;
            const matchId = `${platformId}_${gameId}`;
            return matchId;
        });
      
        const matchIds = await Promise.all(matchIdsPromises);

        const insertQuery = `
            INSERT INTO summoner_info (puuid, summoner_name, tag_line, profile_icon, summoner_level, match_ids)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await client.query(insertQuery, [puuid, gameName, tagLine, profileIconId, summonerLevel, matchIds]);
    }
};

const insertMatches = async (client, matches) => {
    const insertPromises = matches.map(async (match) => {
        const { platformId, gameId } = match.info;
        const { info } = match;

        const matchId = `${platformId}_${gameId}`;
        console.log(matchId);

        // Check if the match already exists in the match_info table
        const matchExistsQuery = 'SELECT COUNT(*) FROM match_info WHERE match_id = $1';
        const { rows } = await client.query(matchExistsQuery, [matchId]);
        const matchExists = rows[0].count > 0;

        // Insert the match if it doesn't already exist
        if (!matchExists) {
            console.log("adding match!");
            const insertQuery = 'INSERT INTO match_info (match_id, match_data) VALUES ($1, $2)';
            await client.query(insertQuery, [matchId, JSON.stringify(info)]);
        }
    });

    // Wait for all insert operations to complete
    await Promise.all(insertPromises);
};

const getMatchInfo = async (client, matchId) => {
    try {
        // Query the match_info table for the match data
        const matchInfoQuery = 'SELECT match_data FROM match_info WHERE match_id = $1';
        const { rows } = await client.query(matchInfoQuery, [matchId]);

        // Check if the match exists
        if (rows.length > 0) {
            // Return the match data
            return rows[0].match_data;
        } else {
            // Match not found
            throw new Error(`Match with ID ${matchId} not found.`);
        }
    } catch (error) {
        throw new Error(`Failed to fetch match information: ${error.message}`);
    }
};

module.exports = {
    getSummonerInfo,
    getAccountInfo,
    getMatches
};