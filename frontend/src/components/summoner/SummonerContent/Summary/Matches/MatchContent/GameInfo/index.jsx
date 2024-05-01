import styled from "styled-components";
import { useSummonerData } from "../../../../../../../contexts/summonerData";
import queueData from "../../../../../../../Json/queueIds";
import { useAppData } from "../../../../../../../contexts/AppDataContext";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    width: 150px;
    flex-direction: row;
    
`

const GameInfoWrapper = styled.div`

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0px 10px 10px;
    width: 100px;
    
    h2 {
        font-size: 14px;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: ${props => props.win ? `#778de4` : `#e47777` };
    }

    p {
        margin-top: 4px;
        font-size: 12px;
        color: rgb(167, 167, 175);
    }
`

const WinTime = styled.div`
    display: flex;
    flex-direction: row;
    p {
        margin-top: 0;
        margin-right: 5px;
        font-weight: 600;
        color: ${props => props.win ? `#778de4` : `#e47777` };
    }

    span {
        color: rgb(167, 167, 175);
        font-size: 12px;
    }
`

const EvalWrapper = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    h5 {
        font-size: 12px;
    }
`

const EvalBox = styled.div`
    margin-top: 6px;
    margin-bottom: 5px;
    background-color: rgb(243, 166, 52);
    border-radius: 6px;
    padding: 4px 8px;

    span {
        font-size: 19px;
        min-width: 2ch;
    }
`

const Score = styled.p`
    font-size: 11px;

`

const CalculateTimeLeft = (gameEndTimestamp) => {
    // Convert milliseconds to human-readable format
    const currentTime = Date.now(); 
    const timeDifference = currentTime - gameEndTimestamp;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return(`${days} days ago`);
    } else if (hours > 0) {
        return(`${hours} hours ago`);
    } else if (minutes > 0) {
        return(`${minutes} minutes ago`);
    } else {
        return(`${seconds} seconds ago`);
    }
    
};

function convertTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    // Pad single-digit seconds with leading zero
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
}

const GameInfo = ({index}) => {
    const {summonerData} = useSummonerData();

    if (!summonerData) {
        return <div>No match found</div>;
    }

    const match = summonerData.matches && summonerData.matches[index];
    const puuid = summonerData.accountInfo.puuid;
    if (!match) {
        return <div>No match found</div>;
    }
    //console.log(match);
    const ourSummoner = match.participants.find(participant => participant.puuid === puuid);
    if (!ourSummoner) {
        return <div>Summoner not found in this match</div>;
    }
    const summonerTeamId = ourSummoner.teamId;
    const summonerTeam = match.teams.find(team => team.teamId === summonerTeamId);
    
    return(
        <Wrapper>
            <GameInfoWrapper win={summonerTeam.win}>
                <div>
                    <h2>{queueData.find(queue => queue.queueId === match.queueId)?.name || `Normal`}</h2>
                    <p>{CalculateTimeLeft(match.gameEndTimestamp)}</p>
                </div>
                <div>
                    <WinTime win={summonerTeam.win}>
                        <p>{summonerTeam.win ? `Win` : `Loss`}</p>
                        <span>{convertTime(match.gameDuration)}</span>
                    </WinTime>
                    
                </div>
            </GameInfoWrapper>
            <EvalWrapper>
                
            </EvalWrapper>
                
        </Wrapper>
    );
};

export default GameInfo;