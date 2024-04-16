import styled from "styled-components";
import SearchTitle from "../../common/SummonerAramHeader";
import ChampionHeader from "../ChampionHeader";
import { createContext, useState } from "react";
import { ChampionProvider } from "../../../contexts/ChampionContext";
import Ranking from "./Ranking";
import Champion from "./Champion";

const Wrapper = styled.div`
    margin-top: 50px;
    height: 100%;
    width: 1100px;
`
const TablesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
    height: 100vh;
    
`
const ContentWrapper = ({children}) => {
    return (
        <Wrapper>
            <ChampionProvider>
                <SearchTitle/>
                <ChampionHeader/>
                <TablesWrapper>
                    <Champion/>
                    <Ranking/>
                </TablesWrapper>
            </ChampionProvider>
        </Wrapper>
    );
    
};

export default ContentWrapper;