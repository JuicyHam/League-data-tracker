const championsService = require('../services/championsService');

const getChampions = async (req, res) => {
    console.log("Test");
    try {
        console.log("trying");
        const champions = await championsService.getAllChampions();
        res.json(champions);
    } catch (error) {
        console.log("error");
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getChampions,
};