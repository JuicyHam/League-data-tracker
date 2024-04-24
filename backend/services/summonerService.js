const axios = require('axios');
const { RateLimit } = require(`async-sema`);
const supabase = require('../db');

const apiKey = 'RGAPI-817a9e45-1a1a-494b-a8a2-4a225b16fc07';
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
    const { data, error } = await supabase
        .from('summoner_info')
        .select('*')
        .eq('puuid', puuid)
        .single();
    if (error && error.code === "PGRST116") {
        return null;
    } else if (error) {
        throw new Error(`Failed to check summoner existence in the databased: ${error.code}`);
    }
    return data;
};

const convertDBData = async (summonerData) => {

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
                return await getMatchInfo(matchId);
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
            updated: summonerData.updated
        };
    } catch {
        throw new Error(`Failed to convert database data: ${error.message}`);
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
        
        console.log("adding summoner info");
        await insertSummonerInfo(accountInfo, summonerInfo, matches);
        console.log("done with summoner doing matches");
        await insertMatches(matches);
        console.log("Done now commiting");
    } catch (error) {
        throw new Error(`Failed to insert summoner data into database: ${error.message}`);
    }
};

const insertSummonerInfo = async (accountInfo, summonerInfo, matches) => {
    const { puuid, gameName, tagLine } = accountInfo;
    const { profileIconId, summonerLevel } = summonerInfo;

    try {
        const existingSummoner= await checkSummonerExistence(puuid);

        if (existingSummoner) {
            const updatedValues = {
                summoner_name: gameName || existingSummoner.summoner_name,
                tag_line: tagLine || existingSummoner.tag_line,
                profile_icon: profileIconId || existingSummoner.profile_icon,
                summoner_level: summonerLevel || existingSummoner.summoner_level,
            };

            const existingMatchIds = existingSummoner.match_ids || [];

            const newMatchIds = matches.map(match => {
                const { platformId, gameId } = match.info;
                return `${platformId}_${gameId}`;
            });

            const combinedMatchIds = [...new Set([...existingMatchIds, ...newMatchIds])];
            const { error: updateError } = await supabase
                .from('summoner_info')
                .update(updatedValues)
                .eq('puuid', puuid);

            if (updateError) {
                throw new Error(`Failed to update existing summoner info: ${updateError.message}`);
            }
        } else {
            console.log("already exists!");
            const matchIds = matches.map(match => {
                const { platformId, gameId } = match.info;
                return `${platformId}_${gameId}`;
            });

            const { error: insertError } = await supabase
                .from('summoner_info')
                .insert([
                    {
                        puuid,
                        summoner_name: gameName,
                        tag_line: tagLine,
                        profile_icon: profileIconId,
                        summoner_level: summonerLevel,
                        match_ids: matchIds
                    }
                ]);

            if (insertError) {
                throw new Error(`Failed to insert new summoner info: ${insertError.message}`);
            }
        }
    } catch (error) {
        throw new Error(`Failed to insert summoner data into database: ${error.message}`);
    }
};

const insertMatches = async (matches) => {
    const insertPromises = matches.map(async (match) => {
        const { platformId, gameId } = match.info;
        const { info } = match;

        const matchId = `${platformId}_${gameId}`;
        console.log(matchId);

        // Check if the match already exists in the match_info table
        const { data: existingMatches, error } = await supabase
            .from('match_info')
            .select('match_id')
            .eq('match_id', matchId)
            .single();

            
            if (error && error.code !== "PGRST116") {
                throw new Error(`Failed to check match existence in the database: ${error.code}`);
            }

        // Insert the match if it doesn't already exist
        if (!existingMatches) {
            console.log("adding match!");
            await supabase
                .from('match_info')
                .upsert([{ match_id: matchId, match_data: JSON.stringify(info) }], { returning: 'minimal' });
        }
    });
    console.log("doing this");
    // Wait for all insert operations to complete
    await Promise.all(insertPromises);
};

const getMatchInfo = async (matchId) => {
    const { data: matchData, error } = await supabase
        .from('match_info')
        .select('match_data')
        .eq('match_id', matchId)
        .single();

    if (error) {
        throw new Error(`Failed to fetch match information: ${error.message}`);
    } else if (matchData) {
        return JSON.parse(matchData.match_data);
    } else {
        throw new Error(`Match with ID ${matchId} not found.`);
    }
    
};

module.exports = {
    getSummonerInfo,
    getAccountInfo,
    getMatches
};