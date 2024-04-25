import styled from "styled-components";
import { useSummonerData } from "../../../../../../contexts/summonerData";
import { useState } from "react";
import SingleChampion from "../../../../../ChampionImages/ChampionIcon";
import { useAppData } from "../../../../../../contexts/AppDataContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #2e2e43;
    padding: 15px;
    margin-top: 10px;
    border-radius: 6px;
`

const QueueOption = styled.button`
    display: flex;
    align-items: center;
    padding: 7px 10px;
    font-size: 12px;
    cursor: pointer;
    margin-right: 6px;
    background-color: ${props => props.selected ? `rgb(26, 26, 41)` : `Transparent`};
    border-radius: 6px;
    font-weight: 400;
    color: rgb(234, 240, 236);
    opacity: ${props => props.selected ? `1` : `0.6`};
    transition: background-color 0.3s ease;
    &:hover {
        background-color: rgb(26, 26, 41);
        opacity: 1;
    }
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
`

const ChampionStats = styled.div`
    display: flex;
    flex-direction: column;
`

const ChampionStat = styled.div`
    display: flex;
    flex-direction: row;
    margin: 6px 0;
    align-items: center;
    font-size: 12px;
    &:last-of-type {
        margin-bottom: 0;
    }
    p {
        
        font-weight: 700;
    }

    span {
        opacity: 0.7;
        font-weight: 300;
    }

    img {
        border-radius: 10px;
    }
`

const FirstSection = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    margin-left: 10px;
    gap: 4px;

`

const SecondSection = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-items: center;
    gap: 1px;
    flex: 1;

   
`

const ThirdSection = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-items: flex-end;

`

const NoDataWrapper = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`


const RankStats = () => {
    const { summonerData } = useSummonerData();
    const { championStats } = summonerData;
    const { championInfo } = useAppData();
    const [selectedOption, setSelectedOption] = useState('Total');

    const flex = championStats[440];
    const solo = championStats[420];

    


    const getChampionName = (championId) => {
        if (championInfo && championInfo[championId]) {
        return championInfo[championId].name;
        } else {
        // Return a default value or handle the case when champion info is not available
        return "Unknown";
        }
    };

    const mergeStats = (solo, flex) => {
        const mergedStats = {};
        for (const championId in solo) {
            mergedStats[championId] = {
                cs: solo[championId].cs + (flex[championId] ? flex[championId].cs : 0),
                wins: solo[championId].wins + (flex[championId] ? flex[championId].wins : 0),
                losses: solo[championId].losses + (flex[championId] ? flex[championId].losses : 0),
                time: solo[championId].time + (flex[championId] ? flex[championId].time : 0),
                kills: solo[championId].kills + (flex[championId] ? flex[championId].kills : 0),
                deaths: solo[championId].deaths + (flex[championId] ? flex[championId].deaths : 0),
                assists: solo[championId].assists + (flex[championId] ? flex[championId].assists : 0)
            };
        }
        return mergedStats;
    };


    const selectedChampionStats = selectedOption === 'Total' ? mergeStats(solo, flex) : selectedOption === 'Ranked Solo' ? solo : flex;

    if (!Object.keys(mergeStats(solo,flex)).length) {
        return null; 
    }

    if (!Object.keys(selectedChampionStats).length) {
        return(
            <Wrapper>
                
                <Header>
                    <QueueOption selected={selectedOption === 'Total'} onClick={() => setSelectedOption('Total')}>Total</QueueOption>
                    <QueueOption selected={selectedOption === 'Ranked Solo'} onClick={() => setSelectedOption('Ranked Solo')}>Ranked Solo</QueueOption>
                    <QueueOption selected={selectedOption === 'Ranked Flex'} onClick={() => setSelectedOption('Ranked Flex')}>Ranked Flex</QueueOption>
                </Header>
                <NoDataWrapper>
                    No Data
                </NoDataWrapper>
            </Wrapper>
            
        );
    }

    return (
        <Wrapper>
            <Header>
                <QueueOption selected={selectedOption === 'Total'} onClick={() => setSelectedOption('Total')}>Total</QueueOption>
                <QueueOption selected={selectedOption === 'Ranked Solo'} onClick={() => setSelectedOption('Ranked Solo')}>Ranked Solo</QueueOption>
                <QueueOption selected={selectedOption === 'Ranked Flex'} onClick={() => setSelectedOption('Ranked Flex')}>Ranked Flex</QueueOption>
            </Header>
            <ChampionStats>
                {/* Map over selected champion stats and render each champion */}
                {Object.keys(selectedChampionStats).map(championId => (
                    <ChampionStat key={championId}>
                        <SingleChampion width={"36px"} height={"36px"} championId={championId} />
                        <FirstSection>
                            <p>{getChampionName(championId)}</p>
                            <span>{Math.floor(selectedChampionStats[championId].cs / (selectedChampionStats[championId].wins + selectedChampionStats[championId].losses))} cs
                            ({(selectedChampionStats[championId].cs / (selectedChampionStats[championId].time/60)).toFixed(1)})
                            </span>

                        </FirstSection>
                        <SecondSection>
                        
                            <p>{((selectedChampionStats[championId].kills + selectedChampionStats[championId].assists) / selectedChampionStats[championId].deaths).toString().substring(0, 3)} KDA</p>
                            <span>{selectedChampionStats[championId].kills} / {selectedChampionStats[championId].deaths} / {selectedChampionStats[championId].assists}</span>
                        </SecondSection>
                        <ThirdSection>
                            <p>{Math.floor((selectedChampionStats[championId].wins / (selectedChampionStats[championId].wins + selectedChampionStats[championId].losses)) * 100)}% wr</p>
                            <span>{selectedChampionStats[championId].wins + selectedChampionStats[championId].losses} Games</span>
                        </ThirdSection>
                    
                    
                    </ChampionStat>
                ))}
            </ChampionStats>
        </Wrapper>
    );
};

export default RankStats;