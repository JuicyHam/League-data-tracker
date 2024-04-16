import styled from "styled-components";
import SearchTitle from "../../common/SummonerAramHeader";
import ChampionHeader from "../ChampionHeader";
import { createContext, useState } from "react";
import { ChampionProvider } from "../../../contexts/ChampionContext";

const Wrapper = styled.div`
    margin-top: 50px;
    height: 100%;
    width: 1100px;
`

const RankWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
    height: 100vh;
    background-color: #2e2e43;
    border-radius: 6px;
`



const ContentWrapper = ({children}) => {
    return (
        <Wrapper>
            <ChampionProvider>
                <SearchTitle/>
                <ChampionHeader/>
                <RankWrapper>

                </RankWrapper>
            </ChampionProvider>
        </Wrapper>
    );
    
};

export default ContentWrapper;