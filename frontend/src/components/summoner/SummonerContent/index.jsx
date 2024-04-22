import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import regionList from "../../../Json/regionList";
import SummonerHeader from "./SummonerHeader";
import Matches from "./Matches";
import SummonerStats from "./SummonerStats";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1100px;
    margin-top: 50px;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

const SummonerContent = () => {
    const { region, summonerName } = useParams();
    const [ summonerData, setSummonerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const regionObject = regionList.find((item) => item.title.toLowerCase() === region);
                console.log(region);
                console.log("test");
                console.log(summonerData);
                if (!regionObject && summonerData) {
                    console.log("not getting data rn");
                    throw new Error("Region not found in regionList");
                }

                const tagName = regionObject.serverName;

                const response = await axios.get(`/api/summoner/${region}/${tagName}/${summonerName}`);
                setSummonerData(response.data);
                console.log(response.data);  
                setLoading(false);  
            } catch (error) {
                console.log(error);
                setError(error);
            }
        };
        
        fetchData();

    }, [region,summonerName]);
    
    if (loading) {
        return <Wrapper>Loading...</Wrapper>;
    }

    return (
        <Wrapper>
            <h2>Summoner Name: {summonerData[1].info.endOfGameResult}</h2>
            <SummonerHeader/>
            <ContentWrapper>
                <Matches/>
                <SummonerStats/>
            </ContentWrapper>
        </Wrapper>
    );
};

export default SummonerContent;