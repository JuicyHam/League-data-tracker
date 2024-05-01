const championsData = require(`../data/rank_data.json`);

// Function to combine array data
function combineArrayData(target, newData) {
    Object.keys(newData).forEach(item => {
        
        if (!target[item]) {
            target[item] = { wins: 0, losses: 0 };
        }
        target[item].wins += newData[item].wins;
        target[item].losses += newData[item].losses;
    });
}

const getAllChampions = (region, rank) => {
    region = region.toLowerCase();
    rank = rank.toLowerCase();
    if (!championsData['rank'][region]) {
        return null;
    }
    if (rank === 'all') {
        const allChampions = {};
        Object.keys(championsData['rank'][region]).forEach(rankKey => {
            const championsByRole = championsData['rank'][region][rankKey];
            Object.keys(championsByRole).forEach(role => {
                if (!allChampions[role]) {
                    allChampions[role] = {};
                }
                Object.keys(championsByRole[role]).forEach(champion => {
                    const championData = championsByRole[role][champion];
                    if (!allChampions[role][champion]) {
                        allChampions[role][champion] = { 
                            banned: 0,
                            boots: {},
                            items: {},
                            losses: 0,
                            opponents: {},
                            runes: {},
                            starter: {},
                            abilities: {},
                            wins: 0 
                        };
                    }
                    // Combine data for each property
                    allChampions[role][champion].banned += championData.banned;
                    // Combine items array data
                    if (champion==='51') {
                        console.log(allChampions[role][champion].abilities);
                        console.log(championData.abilities);
                    }
                    
                    combineArrayData(allChampions[role][champion].boots, championData.boots);
                    combineArrayData(allChampions[role][champion].opponents, championData.opponents);
                    combineArrayData(allChampions[role][champion].runes, championData.runes);
                    combineArrayData(allChampions[role][champion].starter, championData.starter);
                    combineArrayData(allChampions[role][champion].items, championData.items);
                    combineArrayData(allChampions[role][champion].abilities, championData.abilities);
                    
                    // Combine other properties similarly...
                    allChampions[role][champion].wins += championData.wins;
                    allChampions[role][champion].losses += championData.losses;
                });
            });
        });
        
        allChampions['total_games'] = championsData['total_games'];
        
        // Filter out champions with no wins or losses
        Object.keys(allChampions).forEach(role => {
            Object.keys(allChampions[role]).forEach(champion => {
                const championData = allChampions[role][champion];
                if (championData.wins === 0 && championData.losses === 0) {
                    delete allChampions[role][champion];
                }
            });
        });
        
        return allChampions;
    }
    
    if (championsData['rank'][region] && championsData['rank'][region][rank]) {
        const championsByRole = championsData['rank'][region][rank];
        const championsWithResults = {};
        Object.keys(championsByRole).forEach(role => {
            championsWithResults[role] = {};
            Object.keys(championsByRole[role]).forEach(champion => {
                const championData = championsByRole[role][champion];
                if (championData.wins > 0 || championData.losses > 0) {
                    championsWithResults[role][champion] = championData;
                }
            });
        });
        championsWithResults['total_games'] = championsData['total_games']
        return championsWithResults;
    } else {
        return {}; // Return an empty object if the region or rank doesn't exist
    }
}




module.exports = {
    getAllChampions
}