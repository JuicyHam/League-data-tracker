import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";
import { PickRateTab, Table, Tbody, WinRateTab } from "../../../../styles/ChampionStyled";
import { HeadRow } from "../../Builds/PrimaryBuilds";
import Loading from "../../../common/Loading";
import { useAppData } from "../../../../contexts/AppDataContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    background-color: #2e2e43;
    width: 240px;
    border-radius: 6px;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
    height: auto;
    font-weight: 600;
`


const RuneTab = styled.td`
    padding-left: 20px;
`

const RuneImages = styled.div`
    display: flex;
    padding: 12px 0;
    div {
        margin-right: 5px;
    }
`

const RuneImageWrapper = styled.div`
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    
    img {
        width: 32px;
        height: 32px;
    }

`;

const Tr = styled.tr`

    cursor: pointer;
    outline: ${props => props.selected ? "rgb(96, 104, 184) solid 1px" : "none"};
    background-color: ${props => props.selected ? "rgb(53, 58, 91)" : "none"} !important; 
`


const RuneSort = ({ filteredRunes, setSelectedRune, championData, selectedRune}) => {
    // Function to handle click on a rune row
    const {runesIcon} = useAppData();
    const handleRuneClick = (rune) => {
        setSelectedRune(rune);
    };
    let runesArray = []
    if (!(championData && championData.runes)) {
        return(<Loading/>)
    }

    
    return (
        <Wrapper>
            <Title>
                <span>Rune Core List</span>
            </Title>
            <Table>
                <colgroup><col /><col width="65px" /><col width="60px" /></colgroup>
                <thead>
                    <HeadRow>
                        <th>Rune + Item</th>
                        <th>Pick Rate</th>
                        <th>WR</th>
                    </HeadRow>
                </thead>
                <Tbody>
                    {runesIcon.trees && filteredRunes
                        // Calculate win rate for each rune and sort them
                        .map(([rune, stats]) => ({
                            rune,
                            stats,
                            pickRate: ((stats.wins + stats.losses) / filteredRunes.totalGames) * 100,
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
                        // Take only the first 7 sorted runes
                        .slice(0, 7)
                        .map(({ rune, stats, pickRate, winRate }, index) => {
                            // Split the rune string and get the first element
                            const runesArray = rune.replace(/[()\s]/g, '').split(',');
                            let secondaryStyle;

                            if (championData) {
                                const secondaryStyleId = parseInt(runesArray[4].substring(0, 2)); // Extract first two digits and convert to number
                                secondaryStyle = secondaryStyleId * 100;
                            }
                            if (index === 0 && !selectedRune) {
                                setSelectedRune(rune);
                            }
                            const pickRateFirstThreeDigits = Number(pickRate.toFixed(1));
                            const winRateFirstThreeDigits = Number(winRate.toFixed(1));

                            return (
                                <Tr key={rune} onClick={() => handleRuneClick(rune)} selected={selectedRune === rune}>
                                    <RuneTab>
                                        <RuneImages>
                                            <RuneImageWrapper>
                                                {/* Set the src attribute with the first element */}
                                                <img src={runesIcon[runesArray[0]].icon} />
                                            </RuneImageWrapper>
                                            <RuneImageWrapper>
                                                {/* Set the src attribute with the secondary style */}
                                                <img src={runesIcon.trees[secondaryStyle].icon} />
                                            </RuneImageWrapper>
                                        </RuneImages>
                                    </RuneTab>
                                    <PickRateTab>
                                        {/* Render pick rate */}
                                        <p>{pickRateFirstThreeDigits}%</p>
                                        <span>{stats.wins + stats.losses}</span>
                                    </PickRateTab>
                                    <WinRateTab>
                                        {/* Render win rate */}
                                        <p>{winRateFirstThreeDigits}%</p>
                                    </WinRateTab>
                                </Tr>
                            );
                        })
                    }

                    
                </Tbody>
            </Table>
        </Wrapper>
    );
};

export default RuneSort;


