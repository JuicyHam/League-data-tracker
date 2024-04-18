import styled from "styled-components";
import ChampionTableHeader from "./ChampionTableHeader";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { useChampionSearchData } from "../../../../contexts/ChampionContext";
import ChampionTableContent from "./ChampionTableHeader/RankingTableContent";



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
    const [championData, setChampionData] = useState([]);
    const {rankRegion, lane, rank} = useChampionSearchData();
    const prevRankRegion = useRef(rankRegion);
    useEffect(() => {
        console.log(rankRegion);
        if (rankRegion !== prevRankRegion.current || championData.length === 0) { // Check if rankRegion has changed
            prevRankRegion.current = rankRegion; // Update previous rankRegion
            if (rankRegion) { // Check if rankRegion has a value
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`/api/champions?region=${rankRegion}`);
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
    }, [rankRegion]);

    const tableData = useMemo(() => {
        if (lane === "All") {
            return championData;
        } else {
            return championData.filter(champion => champion.Role === lane);
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
                            lane={champion.Role}
                            championName={champion["Champion Name"]}
                            winRate={champion["Win Rate"]}
                            pickRate={champion["Pick Rate"]}
                            banRate={champion["Ban Rate"]}
                            counter={champion.Counters}
                            tier={champion.Tier}
                            rank={index+1}
                        />
                    ))}
                </TBody>
            </RanksTable>
        </Wrapper>
    )
}

export default Ranking;