import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";
import { Arrow, ItemImages, ItemTab, PickRateTab, Table, Tbody, WinRateTab } from "../../../../styles/ChampionStyled";
import { useAppData } from "../../../../contexts/AppDataContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #2e2e43;
    border-radius: 6px;
    border: 1px solid #2e2e43;
`


export const HeadRow = styled.tr`
    font-size: 12px;
    font-weight: 600;

    th {
        background-color: rgb(26, 26, 41);
        padding: 6px 0;
        &:first-child {
            border-top-left-radius: 6px;
            text-align: left;
            padding-left: 25px;
        }
        &:last-child {
            border-top-right-radius: 6px;
        }
    }
`;

const ImageHolder = styled.div`
    display: flex;
    flex-direction: row;

    img {
        border-radius: 6px;
        width: 32px;
        height: 32px;
    }
`



const PrimaryBuilds = ({ championData }) => {
    const { itemIcons } = useAppData();
    // Initialize variables to store the total wins and losses
    let totalGames = 0
   
    // Iterate over the items object
    Object.values(championData.items).forEach(stats => {
        totalGames += stats.wins;
        totalGames += stats.losses;

    });
    console.log(championData);
    return (
        <Wrapper>
            <Table>
                <colgroup><col /><col width="125px" /><col width="125px" /></colgroup>
                <thead>
                    <HeadRow>
                        <th>Items</th>
                        <th>Pick Rate</th>
                        <th>Win Rate</th>
                    </HeadRow>
                </thead>
                {/* Check if itemIcons is loaded */}
                {itemIcons && (
                    <Tbody>
                        {Object.entries(championData.items)
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
                            .slice(0, 5) // Take only the first 5 items
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
                                                        {index !== itemIdsArray.length - 1 && <Arrow />}
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
                )}


            </Table>
        </Wrapper>
    );
};

export default PrimaryBuilds;