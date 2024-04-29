import Navbar from "../common/Header/Navbar";
import styled from "styled-components";

import Footer from "../common/Footer";
import ChampionHeader from "./ChampionHeader";
import ChampionBuild from "./ChampionBuild";
import ChampionCounters from "./ChampionCounters";
import Builds from "./Builds";
import ChampionAbilities from "./ChampionAbilities";
import { useAppData } from "../../contexts/AppDataContext";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { useParams } from "react-router-dom";

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
    const { championInfo } = useAppData();
    const [isLoading, setIsLoading] = useState(true);
    const [championData, setChampionData] = useState(null);
    const { championName } = useParams();
    console.log(championName);
    useEffect(() => {
        const championInfoEntry = Object.entries(championInfo).find(([_, championData]) => championData.name.toLowerCase() === championName.toLowerCase());
        if (championInfoEntry) {
            setChampionData(championInfoEntry[1]);
            setIsLoading(false);
        } else {
            console.log(championInfo);
        }
    }, [championInfo]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Wrapper>
            <Navbar ishome={false} region={"EUW"}/>
            <CenterWrapper>
                <CenterContent>
                    <ChampionHeader championData={championData}/>
                    <OptionWrapper>
                        <ChampionOption selected={true}> Build </ChampionOption>
                        <ChampionOption selected={false}> OTPs </ChampionOption>
                    </OptionWrapper>
                    <ChampionBuild/>
                    <ChampionAbilities/>
                    <Builds/>
                    <ChampionCounters/>
                </CenterContent>
            </CenterWrapper>    
            <Footer/>    
        </Wrapper>
    );
}

export default Champion