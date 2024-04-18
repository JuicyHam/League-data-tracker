const championsService = require('../services/championsService');

const getChampions = async (req, res) => {
    console.log("Test");
    try {
        console.log("trying");
        const region = req.query.region;
        const champions = await championsService.getAllChampions(region);
        res.json(champions);
    } catch (error) {
        console.log("error");
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getChampions,
};