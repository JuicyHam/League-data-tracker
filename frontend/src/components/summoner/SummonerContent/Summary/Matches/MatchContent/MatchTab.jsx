import styled from "styled-components";
import ChampionInfo from "./ChampionInfo";
import PlayerList from "./PlayerList";
import GameInfo from "./GameInfo";
import { useSummonerData } from "../../../../../../contexts/summonerData";
import { useState } from "react";
import Results from "./Results";

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 102px;
    border-radius: ${props => props.selected ? `6px 6px 0 0` : `6px`};
    background-color: ${props => props.win ? `#1e2b5e` : `rgb(68, 33, 36)`};
    margin-top: 10px;   
    cursor: pointer;
    transition: background-color 0.15s ease;
    &:hover {
        background-color: ${props => props.win ? `#172250` : `#381619`};
    }
`



const DropDownColumn = styled.div`
    width: 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.win ? `#344aa1` : `#8c373e`};
    border-top-right-radius: 6px;
    border-bottom-right-radius: ${props => props.selected ? `0` : `6px`};
`

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`





const MatchTab = ({index}) => {
    const {summonerData} = useSummonerData();
    const match = summonerData.matches && summonerData.matches[index];
    const puuid = summonerData.accountInfo.puuid;
    const [showDropDown, setShowDropDown] = useState(false);
    if (!match) {
        return <div>No match found</div>;
    }
    
    const ourSummoner = match.participants.find(participant => participant.puuid === puuid);
    const win = ourSummoner.win;
    return(
        <Wrapper>
            <RowWrapper win={win} onClick={() => setShowDropDown(!showDropDown)} selected={showDropDown}>
                <ContentWrapper>
                    <GameInfo index={index}/>
                    <ChampionInfo index={index}/>
                    <PlayerList index={index}/>
                </ContentWrapper>
                
                <DropDownColumn win={win} selected={showDropDown}>
                    
                    
                </DropDownColumn>
            </RowWrapper>
            {showDropDown && <Results index={index}/>}
        </Wrapper>
        
    );
};

export default MatchTab;