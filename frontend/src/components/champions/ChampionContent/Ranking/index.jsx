import styled from "styled-components";
import ChampionTableHeader from "./ChampionTableHeader";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";

import ChampionTableContent from "./ChampionTableHeader/RankingTableContent";
import { useLocation } from "react-router-dom";
import { useChampionSearchData } from "../../../../contexts/ChampionContext";
import Loading from "../../../common/Loading";
import regionList from "../../../../Json/regionList";



const Wrapper = styled.main`
    width: 750px;
    background-color: #2e2e43;
    border-radius: 6px;
    height: 100%;
`
const RanksTable = styled.table`
    width: 100%;    
    border-collapse: collapse;
    table-layout: auto;
`

const TBody = styled.tbody`

  tr:nth-child(even) {
    background-color: #202033;;
  }
`;

const Ranking = () => {
    const {championData, setChampionData} = useChampionSearchData();
    const { search } = useLocation();
    const [loading, setLoading] = useState(true);
    const queryParams = new URLSearchParams(search);

    const lane = queryParams.get('role') || 'all';
    const rank = queryParams.get('rank') || 'emerald';
    const region = queryParams.get('region') || 'global';

    const prevRegion = useRef(region);
    const prevRank = useRef(rank);

    const tableData = useMemo(() => {
        console.log("inside tabledata");
        if (lane === "all") {
            console.log("all");
            console.log(championData);
            return championData;
        } else {
            console.log("role");
            console.log(championData);
            return championData[lane]
        }
    }, [championData, lane]);

    useEffect(() => {
        console.log(region);
        if (region !== prevRegion.current || rank !== prevRank.current || championData.length === 0) { 
            prevRegion.current = region; 
            prevRank.current = rank
            const regionObject = regionList.find(region => region.title === region) || "global";
            console.log(regionObject);
            if (regionObject) { 
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`/api/champions`, {
                            params : {
                                region: regionObject.serverName,
                                rank: rank
                            }
                        });
                        if (response.status !== 200) {
                            throw new Error('Failed to fetch champion data');
                        }
                        console.log(response.data);
                        setChampionData(response.data);
                        setLoading(false);
                    } catch (error) {
                        console.log("Error fetching champion data: ", error)
                        setLoading(false);
                    }
                };
                fetchData();
            }
        }
    }, [region, rank]);

    if (loading) {
        return <Wrapper><Loading  height={"700px"} /></Wrapper>
    }

    

    return (
            
        <Wrapper>
            <RanksTable>
                <colgroup>
                    <col width="48" />
                    <col width="*" />
                    <col width="56" />
                    <col width="56" />
                    <col width="94" />
                    <col width="110" />
                    <col width="94" />
                    <col width="135" />
                        
                </colgroup>
            
                <thead>
                    <ChampionTableHeader/>
                </thead>
                <TBody>
                    {Object.keys(tableData).map((lane, laneIndex) => (
                        Object.entries(tableData[lane]).map(([championName, championData], championIndex) => (
                            <ChampionTableContent
                                key={`${lane}_${championName}`}
                                lane={lane}
                                championName={championName}
                                winRate={(championData["wins"]/(championData["wins"] + championData["losses"]))*100}
                                pickRate={championData["pickRate"]}
                                banRate={championData["banRate"]}
                                counter={championData.counters}
                                tier={championData.tier}
                                rank={championIndex + 1}
                            />
                        ))
                    ))}
                </TBody>
            </RanksTable>
        </Wrapper>
    )
}

export default Ranking;