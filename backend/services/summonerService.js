const axios = require('axios');
const { RateLimit } = require(`async-sema`);

const apiKey = 'RGAPI-1f2af40b-58d9-4bfd-ab2f-0f0304d9b9be';
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
        return response.data;
    } catch (error) {
        if (error.response && error.response.status == 429) {
            console.log(`Rate Limit exceeded. Retying in ${delay / 1000} seconds...`)
            await new Promise(resolve => setTimeout(resolve, delay));
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
        const url = `https://${regionTag.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;
        const summonerInfo = performRequest(url);

        return await getMatches(puuid);
    } catch (error) {
        throw new Error(`Failed to fetch summoner information: ${error.message}`);
    }
};

const getMatches = async (puuid) => {
    try {
        const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`;
        const matchIds = await performRequest(url);
        console.log(matchIds);
        const matchDetailsPromises = matchIds.map(async (matchId) => {
            const matchDetailUrl = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=RGAPI-1f2af40b-58d9-4bfd-ab2f-0f0304d9b9be`;
            console.log(matchDetailUrl);
            return await performRequest(matchDetailUrl);
        });
        return await Promise.all(matchDetailsPromises);
    } catch (error) {
        throw new Error(`Failed to fetch matches: ${error.message}`);
    }
};



module.exports = {
    getSummonerInfo,
    getAccountInfo,
    getMatches
};