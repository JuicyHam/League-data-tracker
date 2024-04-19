import styled from "styled-components";
import ChampionTableHeader from "./ChampionTableHeader";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";

import ChampionTableContent from "./ChampionTableHeader/RankingTableContent";
import { useLocation } from "react-router-dom";
import { useChampionSearchData } from "../../../../contexts/ChampionContext";



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
    const queryParams = new URLSearchParams(search);

    const lane = queryParams.get('role') || 'all';
    const rank = queryParams.get('rank') || 'emerald';
    const region = queryParams.get('region') || 'global';

    const prevRegion = useRef(region);
    const prevRank = useRef(rank);

    useEffect(() => {
        console.log(region);
        if (region !== prevRegion.current || rank !== prevRank.current || championData.length === 0) { 
            prevRegion.current = region; 
            prevRank.current = rank
            if (region) { 
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`/api/champions?region=${region}&rank=${rank}`);
                        if (response.status !== 200) {
                            throw new Error('Failed to fetch champion data');
                        }
                        console.log(response.data);
                        setChampionData(response.data);
                    } catch (error) {
                        console.log("Error fetching champion data: ", error)
                    }
                };
                fetchData();
            }
        }
    }, [region, rank]);

    const tableData = useMemo(() => {
        if (lane === "all") {
            return championData;
        } else {
            console.log(championData);
            return championData.filter(champion => champion.role.toLowerCase() === lane );
        }
    }, [championData, lane]);

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
                    {tableData.map((champion, index) => (
                        <ChampionTableContent
                            key={index}
                            lane={champion.role}
                            championName={champion["championName"]}
                            winRate={champion["winRate"]}
                            pickRate={champion["pickRate"]}
                            banRate={champion["banRate"]}
                            counter={champion.counters}
                            tier={champion.tier}
                            rank={index+1}
                        />
                    ))}
                </TBody>
            </RanksTable>
        </Wrapper>
    )
}

export default Ranking;