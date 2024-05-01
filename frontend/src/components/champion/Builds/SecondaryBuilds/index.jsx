import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";
import { Arrow, HeadRow, ItemTab, PickRateTab, Table, Tbody, WinRateTab } from "../../../../styles/ChampionStyled";
import { useAppData } from "../../../../contexts/AppDataContext";
import Loading from "../../../common/Loading";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-left: 10px;
`

const Starter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color:  #2e2e43;
    border: 1px solid #2e2e43; /* Border for the th element */
    border-radius: 6px;
    &:last-of-type {
        margin-top: 10px;
    }
`

const ItemImages = styled.div`
    padding: 14.5px 0;
    display: flex;
    align-items: center;
    div {
        margin-right: 8px;
        display: flex;
        align-items: center;
       
    }
    img {
        width: 32px;
        height: 32px;
        border-radius: 6px;
    }
`





const SecondaryBuilds = ({championData}) => {
    const { itemIcons } = useAppData();
    // Initialize variables to store the total wins and losses
    let totalGames = 0
    

    // Iterate over the items object
    Object.values(championData.items).forEach(stats => {
        totalGames += stats.wins;
        totalGames += stats.losses;

    });
    return(
        <Wrapper>
            <Starter>
                <Table>
                    <colgroup><col/><col width="65px"/><col width="60px"/></colgroup>
                    <thead>
                        <HeadRow>
                            
                            <th>Starter Item</th>
                            <th>Pick Rate</th>
                            <th>WR</th>
                            
                        </HeadRow>
                    </thead>
                    <Tbody>
                        {Object.entries(championData.starter).map(([itemIds, stats]) => {
                            // Split the itemIds string and get an array of itemIds
                            const itemIdsArray = itemIds.replace(/[()\s]/g, '').split(',').filter(id => id !== '');

                            const pickRate = ((stats.wins + stats.losses) / totalGames) * 100
                            const pickRateFirstThreeDigits = Number(pickRate.toFixed(1));

                            const winRate = (stats.wins  / (stats.wins + stats.losses)) * 100;
                            const winRateFirstThreeDigits = Number(winRate.toFixed(1));
                            return (
                                <tr key={itemIds}>
                                    <ItemTab>
                                        <ItemImages>
                                            {itemIdsArray.map((itemId, index) => (
                                                <div key={itemId}>
                                                    {itemIcons[itemId] && (
                                                        <img src={itemIcons[itemId].image} alt={itemIcons[itemId].name} />
                                                    )}
                                                </div>
                                            ))}
                                        </ItemImages>
                                    </ItemTab>
                                    <PickRateTab>
                                        {/* Calculate and render pick rate */}
                                        <p>{pickRateFirstThreeDigits}%</p>
                                        <span>{stats.wins + stats.losses} Games</span>
                                    </PickRateTab>
                                    <WinRateTab>
                                        {/* Calculate and render win rate */}
                                        <p>{winRateFirstThreeDigits}%</p>
                                    </WinRateTab>
                                </tr>
                            );
                        })}
                        
                    </Tbody>
                </Table>
            </Starter>
            <Starter>
                <Table>
                    <colgroup><col/><col width="65px"/><col width="60px"/></colgroup>
                    <thead>
                        <HeadRow>
                            <th>Boots</th>
                            <th>Pick Rate</th>
                            <th>WR</th>
                        </HeadRow>
                    </thead>
                    <Tbody>
                    {Object.entries(championData.boots)
                        // Calculate win rate for each item and sort them by win rate in descending order
                        .map(([itemIds, stats]) => ({
                            itemIds,
                            stats,
                            winRate: (stats.wins / (stats.wins + stats.losses)) * 100
                        }))
                        .sort((a, b) => {
                            // Sort by win rate first
                            if (b.winRate !== a.winRate) {
                                return b.winRate - a.winRate; // Sort by win rate in descending order
                            } else {
                                // If win rates are equal, sort by total number of games
                                return (b.stats.wins + b.stats.losses) - (a.stats.wins + a.stats.losses);
                            }
                        })
                        .map(({ itemIds, stats, winRate }) => {
                            // Split the itemIds string and get an array of itemIds
                            const itemIdsArray = itemIds.replace(/[()\s]/g, '').split(',').filter(id => id !== '');

                            const pickRate = ((stats.wins + stats.losses) / totalGames) * 100;
                            const pickRateFirstThreeDigits = Number(pickRate.toFixed(1));

                            const winRateFirstThreeDigits = Number(winRate.toFixed(1));
                            return (
                                <tr key={itemIds}>
                                    <ItemTab>
                                        <ItemImages>
                                            {/* Render item icons for each itemId */}
                                            {itemIdsArray.map((itemId, index) => (
                                                <div key={itemId}>
                                                    {/* Check if item icon exists */}
                                                    {itemIcons[itemId] && (
                                                        <img src={itemIcons[itemId].image} alt={itemIcons[itemId].name} />
                                                    )}
                                                </div>
                                            ))}
                                        </ItemImages>
                                    </ItemTab>
                                    <PickRateTab>
                                        {/* Calculate and render pick rate */}
                                        <p>{pickRateFirstThreeDigits}%</p>
                                        <span>{stats.wins + stats.losses} Games</span>
                                    </PickRateTab>
                                    <WinRateTab>
                                        {/* Render win rate */}
                                        <p>{winRateFirstThreeDigits}%</p>
                                    </WinRateTab>
                                </tr>
                            );
                        })}

                    </Tbody>
                </Table>
            </Starter>
        </Wrapper>
    );
};

export default SecondaryBuilds;