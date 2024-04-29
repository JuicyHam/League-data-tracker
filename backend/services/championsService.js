const championsData = require(`../data/rank_data.json`);

const getAllChampions = (region, rank) => {
    region = region.toLowerCase();
    rank = rank.toLowerCase();
    console.log(region);
    console.log(rank);

    if (championsData[region] && championsData[region][rank]) {
        return championsData[region][rank];
    } else {
        return []; // Return an empty array if the region or rank doesn't exist
    }
}


module.exports = {
    getAllChampions
}