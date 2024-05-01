import Navbar from "../common/Header/Navbar";
import styled from "styled-components";

import Footer from "../common/Footer";
import ChampionHeader from "./ChampionHeader";
import ChampionBuild from "./ChampionBuild";
import ChampionCounters from "./ChampionCounters";
import Builds from "./Builds";
import ChampionAbilities from "./ChampionAbilities";
import { useAppData } from "../../contexts/AppDataContext";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Loading from "../common/Loading";
import { useLocation, useParams } from "react-router-dom";
import regionList from "../../Json/regionList";
import axios from "axios";
import ChampionIcons from "../ChampionImages/ChampionList";

const Wrapper = styled.div`
    
    top: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;

 
`
const CenterContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
     
    width: 1100px;
`
const OptionWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 7px;
    background-color: #2e2e43;
    margin-top: 10px;
`

const ChampionOption = styled.button`
    display: flex;
    justify-content: center;
    padding: 6px 10px;
    font-size: 12px;
    cursor: pointer;
    min-width: 100px;
    margin-right: 6px;
    background-color: ${props => props.selected ? `rgb(26, 26, 41)` : `Transparent`};
    border-radius: 6px;
    font-weight: 400;
    color: rgb(234, 240, 236);
    opacity: ${props => props.selected ? `1` : `0.6`};
    transition: background-color 0.3s ease;
    font-size: 18px;
    &:hover {
        background-color: rgb(26, 26, 41);
        opacity: 1;
    }
`



const Champion = () => {
    const { search } = useLocation();
    const [loading, setLoading] = useState(true);
    const queryParams = new URLSearchParams(search);

    const { championData, setChampionData, championInfo } = useAppData();
    const [isLoading, setIsLoading] = useState(true);
    const [championDataInfo, setchampionDataInfo] = useState(null);
    const [championId, setChampionId] = useState(null);

    const { championName } = useParams();
    
    const lane = queryParams.get('role') || 'all';
    const rank = queryParams.get('rank') || 'all';
    const regionParamValue = queryParams.get('region') || 'global';
    const regionItem = regionList.find(regionItem => regionItem.title === regionParamValue);
    const region = regionItem?.serverName || "global";

    const prevRegion = useRef(region);
    const prevRank = useRef(rank);

    function combineArrayData(target, newData) {
        // Create a new object to store the combined data
        const combinedData = { ...target };
    
        Object.keys(newData).forEach(item => {
            const key = item.trim(); // Remove leading and trailing whitespace
            
            if (!combinedData[key]) {
                combinedData[key] = { wins: 0, losses: 0 };
            }
            
            if (key === "(1, 3, 2, 1, 1, 4, 1, 2, 1, 2, 4, 2, 2, 3, 3, 4, 3)") {
                console.log(`before ${combinedData[key].wins} and ${newData[item].wins} `)
            }
    
            // Combine wins and losses
            combinedData[key].wins += newData[item].wins;
            combinedData[key].losses += newData[item].losses;
            
            if (key === "(1, 3, 2, 1, 1, 4, 1, 2, 1, 2, 4, 2, 2, 3, 3, 4, 3)") {
                console.log(`before ${combinedData[key].wins} and ${newData[item].wins} `)
            }
        });
    
        return combinedData;
    }
    

    const tableData = useMemo(() => {
        if (lane === "all") {
            const combinedData = {};
            Object.keys(championData).forEach(laneKey => {
                if (laneKey !== "total_games") {
                    const laneData = championData[laneKey];
    
                    Object.keys(laneData).forEach(championKey => {
                        if (!combinedData[championKey]) {
                            combinedData[championKey] = { 
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
                        const championStats = laneData[championKey];
    
                        // Combine data for each property
                        combinedData[championKey].banned += championStats.banned;
                        // Create new objects before combining array data
                        const combinedBoots = { ...combinedData[championKey].boots };
                        const combinedOpponents = { ...combinedData[championKey].opponents };
                        const combinedRunes = { ...combinedData[championKey].runes };
                        const combinedStarter = { ...combinedData[championKey].starter };
                        const combinedItems = { ...combinedData[championKey].items };
                        const combinedAbilities = { ...combinedData[championKey].abilities };
    
                        // Combine array data
                        const newCombinedBoots = combineArrayData(combinedBoots, championStats.boots);
                        const newCombinedOpponents = combineArrayData(combinedOpponents, championStats.opponents);
                        const newCombinedRunes = combineArrayData(combinedRunes, championStats.runes);
                        const newCombinedStarter = combineArrayData(combinedStarter, championStats.starter);
                        const newCombinedItems = combineArrayData(combinedItems, championStats.items);
                        const newCombinedAbilities = combineArrayData(combinedAbilities, championStats.abilities);
                        
                        // Update combinedData with new objects
                        combinedData[championKey] = {
                            ...combinedData[championKey],
                            boots: newCombinedBoots,
                            opponents: newCombinedOpponents,
                            runes: newCombinedRunes,
                            starter: newCombinedStarter,
                            items: newCombinedItems,
                            abilities: newCombinedAbilities
                        };
    
                        // Combine other properties similarly...
                        combinedData[championKey].wins += championStats.wins;
                        combinedData[championKey].losses += championStats.losses;
                    });
                    
                }
            });
            combinedData['total_games'] = championData['total_games'];
            return combinedData;
        } else {
            return championData[lane];
        }
    }, [lane, championData, combineArrayData]);
    useEffect(() => {
        const championInfoEntry = Object.entries(championInfo).find(([_, championDataInfo]) => championDataInfo.name.toLowerCase() === championName.toLowerCase());
        if (championInfoEntry) {
            setChampionId(championInfoEntry[0])
            setchampionDataInfo(championInfoEntry[1]);
        } else {
        }
        if (region !== prevRegion.current || rank !== prevRank.current || championData.length === 0) { 
            prevRegion.current = region; 
            prevRank.current = rank
            
            if (region) { 
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`/api/champions`, {
                            params : {
                                region: region,
                                rank: rank
                            }
                        });
                        if (response.status !== 200) {
                            throw new Error('Failed to fetch champion data');
                        }
                        setChampionData(response.data);
                        setLoading(false);
                    } catch (error) {
                        console.log("Error fetching champion data: ", error)
                        setLoading(false);
                    }
                };
                fetchData();
            }
        } else if (championData.length != 0) {
            setIsLoading(false);
        }
    }, [region, rank, championInfo]);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <Wrapper>
            <Navbar ishome={false} region={"EUW"}/>
            <CenterWrapper>
                <CenterContent>
                    <ChampionHeader championDataInfo={championDataInfo}/>
                    <OptionWrapper>
                        <ChampionOption selected={true}> Build </ChampionOption>
                        <ChampionOption selected={false}> OTPs </ChampionOption>
                    </OptionWrapper>
                    {tableData && tableData[championId] && 
                    <div>
                        <ChampionBuild championData={tableData[championId]}/>
                        <ChampionAbilities championData={tableData[championId]} championDataInfo={championDataInfo}/>
                        <Builds championData={tableData[championId]}/>
                        <ChampionCounters/>
                    </div>
                    
                    }
                    
                </CenterContent>
            </CenterWrapper>       
        </Wrapper>
    );
}

export default Champion