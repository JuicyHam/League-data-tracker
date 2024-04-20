const summonerService = require('../services/summonerService');

const getSummonerInfo = async (req, res) => {
    console.log("Test1");
    try {
        const { region, regionTag, summonerName } = req.params;
        console.log(region, summonerName);
        const summonerInfo = await summonerService.getSummonerInfo(region, regionTag, summonerName);
        res.json(summonerInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getSummonerInfo,
};