import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import regionList from "../../../Json/regionList";

const Wrapper = styled.div`

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
                console.log("test")
                if (!regionObject) {
                    throw new Error("Region not found in regionList");
                }

                const tagName = regionObject.serverName;

                const response = await axios.get(`/api/summoner/${region}/${tagName}/${summonerName}`);
                console.log(response);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        };
        
        fetchData();

    }, []);
    
    return (
        <Wrapper>
            
        </Wrapper>
    );
};

export default SummonerContent;