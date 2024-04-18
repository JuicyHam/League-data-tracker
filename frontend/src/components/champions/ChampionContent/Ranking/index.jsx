import styled from "styled-components";
import ChampionTableHeader from "./ChampionTableHeader";
import { useEffect, useState } from "react";
import axios from "axios";
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
    console.log("being rendered");
    const [championData, setChampionData] = useState([]);
    const {rankRegion} = useChampionSearchData();

    useEffect(() => {
        console.log(rankRegion);
        if (rankRegion) { // Check if rankRegion has a value
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/api/champions`);
                    if (response.status != 200) {
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
    }, [rankRegion]);


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
                </TBody>
            </RanksTable>
        </Wrapper>
    )
}

export default Ranking;