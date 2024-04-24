import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Link, useLocation, useParams, Routes, Router} from "react-router-dom";
import styled from "styled-components";
import regionList from "../../../Json/regionList";
import SummonerHeader from "./SummonerHeader";
import Matches from "./Matches";
import SummonerStats from "./SummonerStats";
import SummonerChampion from "./SummonerChampion";
import LiveGame from "./LiveGame";

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

const PageTab = styled.div`
    width: 100%;
    height: 60px;
    background-color: #2e2e43;
`

const NavigationWrapper = styled.div`
    width: 100%;
    height: 46px;
    background-color: #2e2e43;
    margin-top: 10px;
    border-radius: 6px;
`

const Navigation = styled.nav`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 8px 10px;
`

const SummonerLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    background: rgb(26, 26, 41);
    border-radius: 6px;
    padding-block: 12px;
    font-size: 18px;
    color: rgb(234, 240, 236);
    margin-right: 10px;

    &.active{
        background-color: white;
    }
`

const SummonerContent = () => {
    const { region, summonerName } = useParams();
    const [ summonerData, setSummonerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const path = location.pathname;
    const currentPath = location.pathname.split('/')?.[4];
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
            
            <SummonerHeader accountInfo={summonerData.accountInfo} summonerInfo={summonerData.summonerInfo} lastUpdated={summonerData.updated}/>
            <NavigationWrapper>
                <Navigation>
                    <SummonerLink to={`/summoner/${region}/${summonerName}/`} selected={!currentPath}>Summary</SummonerLink>
                    <SummonerLink to={`/summoner/${region}/${summonerName}/champions`} selected={currentPath === `champions`}>Champion</SummonerLink>
                    <SummonerLink to={`/summoner/${region}/${summonerName}/livegame`} selected={currentPath===`livegame`}>Live Game</SummonerLink>
                </Navigation>
                
            </NavigationWrapper>
            <ContentWrapper>
                
                <Routes>
                    <Route path={`/champions`} element={<SummonerChampion/>}></Route>
                    <Route path={`/liveGame`} element={<LiveGame/>}></Route>
                </Routes>
                
                
            </ContentWrapper>
        </Wrapper>
    );
};

export default SummonerContent;
    