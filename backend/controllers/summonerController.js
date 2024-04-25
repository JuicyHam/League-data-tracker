const summonerService = require('../services/summonerService');

const getSummonerInfo = async (req, res) => {
    console.log("Test1");
    try {
        const { region, regionTag, summonerName } = req.params;
        const summonerInfo = await summonerService.getSummonerInfo(region, regionTag, summonerName);
        res.json(summonerInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getNames = async (req, res) => {
    console.log("Test2");
    try {
        const { region, regionTag, summonerName } = req.params;
        console.log(region);
        console.log(regionTag);
        console.log(summonerName);
        const nameSuggestions = await summonerService.getNames(region, regionTag, summonerName);
        res.json(nameSuggestions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getSummonerInfo,
    getNames
};