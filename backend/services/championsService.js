const championsData = require(`../data/champions_data.json`);

const getAllChampions = () => {
    console.log("Getting champion data");
    return championsData;
}

module.exports = {
    getAllChampions
}