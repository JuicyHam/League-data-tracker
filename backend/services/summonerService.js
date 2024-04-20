const axios = require(`axios`)

const apiKey = `RGAPI-1f2af40b-58d9-4bfd-ab2f-0f0304d9b9be`;

const getAccountInfo = async (region, summonerName) => {
    try {
        console.log("p1")
        const [name, tagLine] = summonerName.split(`-`);
        const finalTagLine = tagLine || region;
        const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(finalTagLine)}?api_key=${apiKey}`;
        console.log("p2")
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch puuid`)
    }
};

const getSummonerInfo = async (region, regionTag, summonerName ) => {
    try {
        
        console.log(region,regionTag,summonerName, "tick");
        const accountInfo = await getAccountInfo(region, summonerName);
        console.log(accountInfo);
        console.log(accountInfo.puuid);
        if (!(accountInfo && accountInfo.puuid)) {
            throw new Error(`Failed to fetch summoner name`);
        }
        const puuid = accountInfo.puuid;
        console.log(accountInfo.puuid);
        const url = `https://${regionTag.toLowerCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=RGAPI-1f2af40b-58d9-4bfd-ab2f-0f0304d9b9be`;
        console.log(url);
        const response = await axios.get(url);
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch summoner infomation`);
    }
};




module.exports = {
    getSummonerInfo,
    getAccountInfo
}