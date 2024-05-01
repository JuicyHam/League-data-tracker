import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Link, useParams, Routes} from "react-router-dom";
import styled from "styled-components";
import regionList from "../../../Json/regionList";
import SummonerHeader from "./SummonerHeader";


import Summary from "./Summary";
import { useSummonerData } from "../../../contexts/summonerData";
import Loading from "../../common/Loading";
import ErrorMessage from "../../common/Error";
import { useAppData } from "../../../contexts/AppDataContext";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1100px;
    margin-top: 50px;
    margin-bottom: 50px;
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
    background: ${props => props.selected ? `rgb(26, 26, 41)`: `transparent`};
    border-radius: 6px;
    padding-block: 12px;
    font-size: 18px;
    color: rgb(234, 240, 236);
    margin-right: 10px;

`

const SummonerContent = () => {
    const { region, summonerName } = useParams();
    const { selectedRegion, setSelectedRegion } = useAppData();
    const { summonerData, setSummonerData} = useSummonerData();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const path = location.pathname;
    const currentPath = location.pathname.split('/')?.[4];
    const fetchData = async (update) => {
        try {
            setLoading(true);

            const regionObject = regionList.find((item) => item.title.toLowerCase() === region.toLowerCase());
            console.log(region);
            console.log("test");
            console.log(summonerData);
            if (!regionObject) {
                console.log("not getting data rn");
                throw new Error("Region not found in regionList");
            }

            // Update selected region if different
            if (regionObject && regionObject.title.toLowerCase() !== selectedRegion.toLowerCase()) {
                setSelectedRegion(regionObject.title);
                console.log("Set");
            }

            const tagName = regionObject.serverName;
            console.log(`update ${update} `);
            const response = await axios.get(`/api/summoner/${region}/${tagName}/${summonerName}?update=${update}`);
            setSummonerData(response.data);
            console.log(response.data);  
            setLoading(false);  
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    };
    useEffect(() => {
        
        
        fetchData(false);

    }, [region,summonerName]);

    const handleUpdate = () => {
        // Call fetchData to refetch summonerData
        fetchData(true);
    };
    
    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <ErrorMessage errorMessage={"Summoner page not found"}/>;
    }
   
    return (
        <Wrapper>
            
            <SummonerHeader onUpdate={handleUpdate}/>
            <NavigationWrapper>
                <Navigation>
                    <SummonerLink to={`/summoner/${region}/${summonerName}/`} selected={!currentPath}>Summary</SummonerLink>
                </Navigation>
                
            </NavigationWrapper>
            <ContentWrapper>
                
                <Routes>
                    <Route path={`/`} element={<Summary/>} />
                </Routes>
                
                
            </ContentWrapper>
        </Wrapper>
    );
};

export default SummonerContent;
    