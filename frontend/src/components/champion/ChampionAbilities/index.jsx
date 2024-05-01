import styled from "styled-components";
import SingleChampion from "../../ChampionImages/ChampionIcon";
import { Arrow } from "../../../styles/ChampionStyled";
import { useAppData } from "../../../contexts/AppDataContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    background-color: #2e2e43;
    width: 100%;
    border-radius: 6px;
`

const PriorityWrapper = styled.div`
    padding: 20px;
    border-right: 1px solid #181820;
    
`

const Title = styled.div`
    display: flex;
    span {
        font-size: 12px;
        font-weight: 300;
        opacity: 0.7;
    }
    h3 {
        font-size: 14px;
        font-weight: 700;
        margin-right: 15px;
    }
    margin-bottom: 20px;
`

const PriorityPreview = styled.div`
    display: flex;
    flex-direction: column;
    
`

const PriorityImages = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    img {
        width: 32px;
        height: 32px;
    }
`

const PriorityText = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    p {
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 5px;
    }

    span {
        font-size: 11px;
        font-weight: 300;
        opacity: 0.7;
    }
`

const PathWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex: 1;
`

const AbilityRow = styled.div`
    display: flex;
    margin-bottom: 6px;
`

const SkillLabel = styled.div`
    flex: 1 1;
    background-color: #11112a;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;

    p {
        font-size: 12px;
        font-weight: 600;
        margin-left: 10px;
    }

    img {
        width: 24px;
        height: 24px;
        border-radius: 3px;
    }
`

const AbilityWrapper = styled.div`
    display: flex;
    flex: 1 1;
    display: flex;
    justify-content: center;
`

const AbilityBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    background-color: ${props => props.selected ? "#11112a" : "rgb(34, 34, 54)"};

`


const ChampionAbilities = ({ championData, championDataInfo }) => {
    

    let highestWinRate = -1;
    let highestWinRateAll = -1;
    let highestTotalGames = 0;
    let highestWinRateAbilities = null;
    let highestWinRateFull = null

    // Object to store abilities grouped by the first three indexes
    const abilitiesGroups = {};

    // Loop through the championData.abilities object
    Object.entries(championData.abilities).forEach(([abilitiesKey, abilitiesData]) => {


        const winRateFull = abilitiesData.wins / (abilitiesData.wins + abilitiesData.losses);
        // If this win rate is higher than the current highest, update highestWinRate and highestWinRateAbilities
        if (winRateFull > highestWinRateAll) {
            highestWinRateAll = winRateFull;
            highestWinRateFull = {
                key: abilitiesKey,
                wins: abilitiesData.wins,
                losses: abilitiesData.losses
            };
        }
        // Split the key into an array of numbers
        const cleanedKey = abilitiesKey.replace(/[()]/g, '');
        // Split the cleaned key into an array of numbers
        const numbers = cleanedKey.split(',').map(Number);
        
        // Take the first three numbers
        const firstThreeIndexes = numbers.slice(0, 3);

        // Convert the first three indexes array to a string for grouping
        const key = firstThreeIndexes.join(',');
        
        // If the abilities group doesn't exist, create it
        if (!abilitiesGroups[key]) {
            abilitiesGroups[key] = {
                wins: 0,
                losses: 0
            };
        }

        
        
        // Add wins and losses to the abilities group
        abilitiesGroups[key].wins += abilitiesData.wins;
        abilitiesGroups[key].losses += abilitiesData.losses;

        
        // Calculate win rate
        const winRate = abilitiesGroups[key].wins / (abilitiesGroups[key].wins + abilitiesGroups[key].losses);
        const totalGames = abilitiesData.wins + abilitiesData.losses;
        console.log(winRate);
        console.log(abilitiesGroups);

        // If this win rate is higher than the current highest, update highestWinRate and highestWinRateAbilities
        if (winRate > highestWinRate || (highestWinRateAbilities && key === highestWinRateAbilities.key)) {
            highestWinRate = winRate;
            highestTotalGames = totalGames;
            highestWinRateAbilities = {
                key,
                wins: abilitiesGroups[key].wins,
                losses: abilitiesGroups[key].losses
            };
        } else if (winRate === highestWinRate) {
            
            if (totalGames > highestTotalGames) {
                highestWinRate = winRate;
                highestTotalGames = totalGames;
                highestWinRateAbilities = {
                    key,
                    wins: abilitiesGroups[key].wins,
                    losses: abilitiesGroups[key].losses
                };
            }
        }
        
        // If this total is higher than the current highest, update highestTotalGames and highestTotalGamesAbilities
        
    });

    
    

    // highestWinRateAbilities now contains the abilities with the highest win rate
    const numbers = highestWinRateFull.key.match(/\d+/g);
    const numbersInt = numbers.map(Number);
        // Define the target number of occurrences for each number
    const targetOccurrences = [5, 5, 5];

    // Count occurrences of each number
    const occurrences = {};
    numbersInt.forEach(number => {
        occurrences[number] = occurrences[number] ? occurrences[number] + 1 : 1;
    });

    // Add additional numbers to meet the target occurrences
    targetOccurrences.forEach((target, index) => {
        const numberToAdd = index + 1; // Numbers start from 1, index starts from 0
        while (occurrences[numberToAdd] < target) {
            numbersInt.push(numberToAdd);
            occurrences[numberToAdd]++;
        }
    });

    if (numbersInt[5] !== 4) {
        console.log(numbersInt[5]);
        numbersInt.splice(5, 0, 4); // Insert 4 at the 6th index
    }
    if (numbersInt[10] !== 4) {
        numbersInt.splice(10, 0, 4); // Insert 4 at the 11th index
    }
    if (numbersInt[15] !== 4) {
        numbersInt.splice(15, 0, 4); // Insert 4 at the 16th index
    }
    
    const [first, second, third] = highestWinRateAbilities.key.split(',').map(Number).slice(0, 3);
    // Create an array of objects representing each row
    console.log(highestWinRateAbilities);
    const numRows = Math.min(numbersInt.length, 4);
    return(
        <Wrapper>
            <PriorityWrapper>
                <Title>
                    <h3>Skill Priority</h3>
                </Title>
                <PriorityPreview>

                </PriorityPreview>
                    <PriorityImages>
                         
                        <img src={championDataInfo.abilities[first].image} />
                        <Arrow height={"16px"} />
                        <img src={championDataInfo.abilities[second].image} />
                        <Arrow height={"16px"} />
                        <img src={championDataInfo.abilities[third].image} />
                    </PriorityImages>
                    <PriorityText>
                        <p>{Number((highestWinRateAbilities.wins / (highestWinRateAbilities.wins + highestWinRateAbilities.losses))*100).toFixed(1)}%</p>
                        <span>{highestWinRateAbilities.wins + highestWinRateAbilities.losses} Games</span>
                    </PriorityText>
            </PriorityWrapper>
            <PathWrapper>
                <Title>
                    <h3>Skill Path</h3>
                    <span> Most popular ability order</span>
                </Title>
                <div>
                    {[...Array(numRows)].map((_, rowIndex) => (
                        <AbilityRow key={rowIndex}>
                            <SkillLabel>
                                <img src={championDataInfo.abilities[rowIndex+1].image} />
                                <p>{championDataInfo.abilities[rowIndex+1].name}</p>
                            </SkillLabel>
                            <AbilityWrapper>
                                {/* Render AbilityBox for each number */}
                                {numbersInt.map((number, numberIndex) => (
                                    <AbilityBox key={numberIndex} selected={number === rowIndex+1}>
                                        {number == rowIndex+1 && <p>{numberIndex+1}</p>}
                                    </AbilityBox>
                                ))}
                                
                                
                            </AbilityWrapper>
                        </AbilityRow>
                    ))}
                </div>
            </PathWrapper>
        </Wrapper>
    );
};

export default ChampionAbilities;