const championsData = require(`../data/all_champions_data.json`);

const getAllChampions = (region, rank) => {
    region = region.toLowerCase();
    rank = rank.toLowerCase();
    if (championsData[region] && championsData[region][rank]) {
        return championsData[region][rank];
    } else {
        return []; // Return an empty array if the region or rank doesn't exist
    }
}


module.exports = {
    getAllChampions
}