import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSummonerData } from "../../../../../../../contexts/summonerData";
import SingleChampion from "../../../../../../ChampionImages/ChampionIcon";

const Wrapper = styled.div`
    width: 235px;
    padding-left: 30px;
    display: flex;
    flex-direction: row;
`

const TeamList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1;
    overflow: hidden;
    &:first-of-type {
        margin-right: 4px;
    }
`

const SummonerWrapper = styled.div`
    display: flex;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 2px;
    }
`

const ChampionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    heigth: 15px;
    width: 15px;
    border-radius: 2px;
    overflow: hidden;

`

const SummonerName = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 90px;
`

const SummonerLink = styled(Link)`
    font-size: 11px;
    font-weight: ${props => props.selected ? `700` : `300`};
    color: ${props => props.selected ? `White` : `inherit`};
    cursor: pointer;

`

const PlayerList = ({index}) => {
    const {summonerData} = useSummonerData();
    const match = summonerData.matches && summonerData.matches[index];
    const puuid = summonerData.accountInfo.puuid;
    if (!match) {
        return <div>No match found</div>;
    }

    const ourSummoner = match.participants.find(participant => participant.puuid === puuid);
    if (!ourSummoner) {
        return <div>Summoner not found in this match</div>;
    }

    const team1Participants = match.participants.filter(participant => participant.teamId === 100);
    const team2Participants = match.participants.filter(participant => participant.teamId === 200);

    return (
        <Wrapper>
            <TeamList>
                {team1Participants.map((participant, i) => (
                    <SummonerWrapper key={i}>
                        <ChampionWrapper>
                            <SingleChampion championId={participant.championId} width={'15px'} height={'15px'}/>
                        </ChampionWrapper>
                        <SummonerName>
                            <SummonerLink to={`/summoner/euw/${participant.summonerName}`} selected={participant === ourSummoner}>{participant.summonerName}</SummonerLink>
                        </SummonerName>
                    </SummonerWrapper>
                ))}
            </TeamList>
            <TeamList>
                {team2Participants.map((participant, i) => (
                    <SummonerWrapper key={i}>
                        <ChampionWrapper>
                            <SingleChampion championId={participant.championId}  width={'15px'} height={'15px'}/>
                        </ChampionWrapper>
                        <SummonerName>
                            <SummonerLink to={`/summoner/euw/${participant.summonerName}`} selected={participant === ourSummoner}>{participant.summonerName}</SummonerLink>
                        </SummonerName>
                    </SummonerWrapper>
                ))}
            </TeamList>
        </Wrapper>
    );
};


export default PlayerList;