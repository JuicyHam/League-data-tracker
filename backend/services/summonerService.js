const axios = require('axios');
const { RateLimit } = require(`async-sema`);
const supabase = require('../db');

const apiKey = 'RGAPI-22d1ea89-87b1-47ef-a3df-375ef3858969';
const SEARCH_LIMIT_PER_SECOND = 20;
const SERACH_LIMIT_PER_2_MINUTES = 100;
const RETY_DELAY_BASE = 1000;

const rateLimitPerSecond = RateLimit(SEARCH_LIMIT_PER_SECOND, { timeUnit: 1000});
const rateLimitPer2Minuets = RateLimit(SERACH_LIMIT_PER_2_MINUTES, { timeUnit: 120000});

const regionMap = {
    "na1": "americas",
    "la2": "americas",
    "la1": "americas",
    "br1": "americas",
    "euw1": "europe",
    "eun1": "europe",
    "tr1": "europe",
    "'ru1'": "europe",
    "jp1": "asia",
    "kr": "asia",
    "sg2": "sea",
    "oc1": "sea",
    "ph2": "sea",
    "th2": "sea",
    "tw2": "sea",
    "vn2": "sea",


};

const performRequest = async (url) => {
    try {

        await rateLimitPerSecond();
        //console.log(`Passed Seconds`);
        await rateLimitPer2Minuets();
        //console.log(`Passed 2 minutes`);
        
        const response = await axios.get(url);
        //console.log(`got response`);
        //console.log(url);
        return response.data;
    } catch (error) {
        
        throw new Error(`Failed to fetch data from API: ${error.message}`);
    }
};

const getAccountInfo = async (region, summonerName, regionTag) => {
    try {
        const [name, tagLine] = summonerName.split('-');
        const finalTagLine = tagLine || regionTag;
        const server = regionMap[region.toLowerCase()]
 
        const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(finalTagLine)}?api_key=${apiKey}`;

        return await performRequest(url);
    } catch (error) {
        throw new Error(`Failed to fetch account information: ${error.message}`);
    }
};

const getSummonerInfo = async (region, regionTag, summonerName) => {
    try {

        const accountInfo = await getAccountInfo(regionTag, summonerName,region);
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

        const matches = await getMatches(puuid, regionTag);

        const championStats = await getChampionStats(puuid, matches);
 
        const ranked = await getRanked(regionTag, summonerInfo.id);
        const playerData = {
            accountInfo: accountInfo,
            summonerInfo: summonerInfo,
            matches: matches,
            updated: new Date(),
            ranked,
            championStats
        };

        await insertSummonerData(accountInfo, summonerInfo, matches,ranked);
        
        return playerData;
    } catch (error) {
        throw new Error(`Failed to fetch summoner information: ${error.message}`);
    }
};

const fetchFreshSummonerInfo = async (region, regionTag, summonerName) => {
    try {
        const accountInfo = await getAccountInfo(regionTag, summonerName, region);
        if (!accountInfo || !accountInfo.puuid) {
            throw new Error(`Failed to fetch summoner name`);
        }
        const puuid = accountInfo.puuid;

        const summonerDataFromDB = await checkSummonerExistence(puuid);
        let playerData = {}; // Initialize playerData variable

        if (summonerDataFromDB) {
           
            playerData = await convertDBData(summonerDataFromDB);
        }

        const url = `https://${regionTag.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;
        const summonerInfo = await performRequest(url);
        const newMatches = await getMatches(puuid, regionTag);
        const ranked = await getRanked(regionTag, summonerInfo.id);
        // Merge existing data with new data
        playerData = {
            accountInfo: accountInfo,
            summonerInfo: summonerInfo,
            matches: mergeMatches(playerData.matches, newMatches), // Merge matches
            updated: new Date(),
            ranked
        };

        console.log(`Number of matches: ${playerData.matches.length}`);

        // Get champion stats for merged matches
        playerData.championStats = await getChampionStats(puuid, playerData.matches);

        await insertSummonerData(playerData.accountInfo, playerData.summonerInfo, playerData.matches, playerData.ranked);
        
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
            puuid: summonerData.puuid,
            tagLine: summonerData.tag_line
        };
        const summonerInfo = {
            profileIconId: summonerData.profile_icon,
            summonerLevel: summonerData.summoner_level,
            id: summonerData.summoner_id
        };

        const ranked = JSON.parse(summonerData.ranked);

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
        const championStats = await getChampionStats(summonerData.puuid,filteredMatches);

        return {
            accountInfo: accountInfo,
            summonerInfo: summonerInfo,
            matches: filteredMatches,
            updated: summonerData.updated,
            ranked: ranked,
            championStats
        };
    } catch {
        throw new Error(`Failed to convert database data: ${error.message}`);
    }
};

const getMatches = async (puuid, region) => {
    try {
        const server = regionMap[region.toLowerCase()];
        const url = `https://${server}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${apiKey}`;

        const matchIds = await performRequest(url);
        console.log(matchIds);
        const matchDetailsPromises = matchIds.map(async (matchId) => {
            console.log(matchId);
            try {
                const storedMatchData = await getMatchInfo(matchId);
                if (storedMatchData) {
                    // If match data is found in the database, return it directly
                    console.log("shouldnt be here");
                    return storedMatchData;
                }
            } catch (error) {
                console.log(error);
            }
            
            
           
            
            console.log("Should");
            // Fetch match details and timeline from the API
            const matchDetailUrl = `https://${server}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`;
            const matchTimelineUrl = `https://${server}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${apiKey}`;
            console.log(matchDetailUrl);
            try {
                // Fetch match details and timeline concurrently
                const [matchDetailsResponse, matchTimeline] = await Promise.all([
                    performRequest(matchDetailUrl),
                    performRequest(matchTimelineUrl)
                ]);
                // Extract only the desired data from match details
                const matchDetails = matchDetailsResponse.info;
                // Find build orders (including selling) for each participant
                const buildOrders = findBuildOrders(matchTimeline.info);
                matchDetails.buildOrders = buildOrders;
                const abilities = findAbilityLevelUps(matchTimeline.info);
                matchDetails.abilities = abilities;

                return matchDetails;
            } catch (error) {
   
                console.error(`Failed to fetch match details for match ID ${matchId}: ${error.message}`);
                return null; 
            }
            
        });
        console.log("matches")

        const matchDetails = await Promise.all(matchDetailsPromises);
        console.log("matches done");

        return matchDetails.filter(match => match !== null);
    } catch (error) {
        throw new Error(`Failed to fetch matches: ${error.message}`);
    }
};


const findBuildOrders = (timeline) => {
    const buildOrders = {};
    timeline.frames.forEach(frame => {
        frame.events.forEach(event => {
            
            const participantId = event.participantId;
            const itemId = event.itemId;
            const eventType = event.type;
            
            if (!buildOrders[participantId]) {
                buildOrders[participantId] = [];
            }

            if (eventType === "ITEM_PURCHASED") {
                buildOrders[participantId].push({ type: "BUY", itemId, timestamp: event.timestamp });
            } else if (eventType === "ITEM_SOLD") {
                buildOrders[participantId].push({ type: "SELL", itemId, timestamp: event.timestamp });
            }
        });
    });

    return buildOrders;
};

const findAbilityLevelUps = (timeline) => {
    const abilityLevelUps = {};
    timeline.frames.forEach(frame => {
        frame.events.forEach(event => {
            const participantId = event.participantId;
            const skillSlot = event.skillSlot;
            const eventType = event.type;

            if (!abilityLevelUps[participantId]) {
                abilityLevelUps[participantId] = [];
            }

            if (eventType === "SKILL_LEVEL_UP") {
                abilityLevelUps[participantId].push({ skillSlot, timestamp: event.timestamp });
            }
        });
    });
    return abilityLevelUps;
};

const getRanked = async (regionTag, summonerId) => {
    try {
        const url = `https://${regionTag.toLowerCase()}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`;
        const rankedDetails = await performRequest(url);
        return rankedDetails;
    } catch (error) {
        throw new Error(`Failed to fetch ranked details: ${error.message}`);
    }
};

const insertSummonerData = async (accountInfo, summonerInfo, matches, ranked) => {
    try {
        console.log("inserting");
        await insertSummonerInfo(accountInfo, summonerInfo, matches, ranked);
        await insertMatches(matches);
    } catch (error) {
        throw new Error(`Failed to insert summoner data into database: ${error.message}`);
    }
};

const insertSummonerInfo = async (accountInfo, summonerInfo, matches, ranked) => {
    const { puuid, gameName, tagLine } = accountInfo;
    const { profileIconId, summonerLevel, id } = summonerInfo;

    try {
        const existingSummoner= await checkSummonerExistence(puuid);
        console.log("inserting2");
        if (existingSummoner) {
            console.log("inserting3");
            const newMatchIds = matches.map(match => {
                const { platformId, gameId } = match;
                return `${platformId}_${gameId}`;
            });
            const updatedValues = {
                summoner_name: gameName || existingSummoner.summoner_name,
                tag_line: tagLine || existingSummoner.tag_line,
                profile_icon: profileIconId || existingSummoner.profile_icon,
                summoner_level: summonerLevel || existingSummoner.summoner_level,
                summoner_id: id || existingSummoner.summoner_id,
                ranked: JSON.stringify(ranked) || existingSummoner.ranked,
                match_ids: newMatchIds || existingSummoner.match_ids
            };


            

        

        
            const { error: updateError } = await supabase
                .from('summoner_info')
                .update(updatedValues)
                .eq('puuid', puuid);


            if (updateError) {
                throw new Error(`Failed to update existing summoner info: ${updateError.message}`);
            }
        } else {
            const matchIds = matches.map(match => {
                const { platformId, gameId } = match;
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
                        summoner_id: id,
                        match_ids: matchIds,
                        ranked: JSON.stringify(ranked)
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
        const { platformId, gameId } = match;

        const matchId = `${platformId}_${gameId}`;

        const { data: existingMatches, error } = await supabase
            .from('match_info')
            .select('match_id')
            .eq('match_id', matchId)
            .single();

            
            if (error && error.code !== "PGRST116") {
                throw new Error(`Failed to check match existence in the database: ${error.code}`);
            }

        if (!existingMatches) {
            await supabase
                .from('match_info')
                .upsert([{ match_id: matchId, match_data: JSON.stringify(match) }], { returning: 'minimal' });
        }
    });

    await Promise.all(insertPromises);
};

const getMatchInfo = async (matchId) => {
    const { data: matchData, error } = await supabase
        .from('match_info')
        .select('match_data')
        .eq('match_id', matchId)
        .single();

    if (error && error.code !== "PGRST116") {
        throw new Error(`Failed to fetch match information: ${error.message}`);
    } else if (matchData) {
        return JSON.parse(matchData.match_data);
    }
    return null;
};

const getChampionStats = async (puuid, matches) => {
    try {

        const championStats = {420: {}, 440: {}};
        const queueIds = [420, 440];
        if (!matches) {
            return null;
        }


        // Filter matches based on whether their queueId is included in queueIds array
        const filteredMatches = matches.filter(match => queueIds.includes(match.queueId));

        filteredMatches.forEach(match => {

            const participant = match.participants.find(participant => participant.puuid === puuid);
            const championId = participant.championId;
            const win = participant.win; 
            const kills = participant.kills; 
            const deaths = participant.deaths; 
            const assists = participant.assists; 
            const cs = participant.totalMinionsKilled + participant.neutralMinionsKilled; 
            const time = match.gameDuration;
            if (!championStats[match.queueId][championId]) {
                championStats[match.queueId][championId] = {
                    wins: 0,
                    losses: 0,
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    cs: 0,
                    time: 0,
                    name: participant.championName
                };
            }

            if (win) {
                championStats[match.queueId][championId].wins++;
            } else {
                championStats[match.queueId][championId].losses++;
            }

            championStats[match.queueId][championId].kills += kills;
            championStats[match.queueId][championId].deaths += deaths;
            championStats[match.queueId][championId].assists += assists;
            championStats[match.queueId][championId].cs += cs;
            championStats[match.queueId][championId].time += time
        });

        // Calculate win-loss ratio and KDA ratio for each champion

        return championStats;
    } catch (error) {
        throw new Error(`Failed to fetch match data: ${error.message}`);
    }
};

const mergeMatches = (oldMatches, newMatches) => {
    console.log(oldMatches.length);
    console.log(newMatches.length);
    if (!oldMatches || oldMatches.length === 0) {
        console.log("old");
        return newMatches.slice().sort((a, b) => a.gameEndTimeStamp - b.gameEndTimeStamp);
    }

    // Create a map of matchIds from oldMatches
    const oldMatchIds = new Set(oldMatches.map(match => match.gameId));
    console.log(oldMatchIds);
    // Filter out matches from newMatches that already exist in oldMatches
    const uniqueNewMatches = newMatches.filter(match => !oldMatchIds.has(match.gameId));
    console.log(uniqueNewMatches.length);
    // Concatenate oldMatches with unique newMatches
    const mergedMatches = [...uniqueNewMatches, ...oldMatches];
    
    // Sort merged matches by gameEndTimeStamp
    return mergedMatches.slice().sort((a, b) => a.gameEndTimeStamp - b.gameEndTimeStamp);
};


const getNames = async (region, regionTag, summonerName) => {
    const [name, tagLine] = summonerName.split('-');
    let query = supabase.from('summoner_info').select('*').ilike('summoner_name', `%${name}%`);

    // Check if tagLine is provided and not empty
    if (tagLine && tagLine.trim() !== '') {
        // If tagLine is provided, add ilike condition for tag_line
        query = query.ilike('tag_line', `%${tagLine}%`);
    }

    const { data, error } = await query
        .order('summoner_name') // Order the results by name
        .limit(5); // Limit the results to 5 names

    if (error) {
        throw new Error(`Failed to fetch names from the database: ${error.message}`);
    }
    return data;
};

module.exports = {
    getSummonerInfo,
    getAccountInfo,
    getMatches,
    getNames,
    fetchFreshSummonerInfo
};