const summonerService = require('../services/summonerService');

const getSummonerInfo = async (req, res) => {
    console.log("Test1");
    try {
        const { region, regionTag, summonerName } = req.params;
        
        // Check if the update tag is present in the query parameters
        const update = req.query.update === 'true';
        console.log(req.query.update);
        // If update tag is present, fetch fresh data
        if (update) {
            const freshSummonerInfo = await summonerService.fetchFreshSummonerInfo(region, regionTag, summonerName);
            res.json(freshSummonerInfo);
        } else {
            // Otherwise, fetch cached data
            const summonerInfo = await summonerService.getSummonerInfo(region, regionTag, summonerName);
            res.json(summonerInfo);
        }
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