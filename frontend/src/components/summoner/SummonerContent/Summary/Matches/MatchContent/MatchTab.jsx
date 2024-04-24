import styled from "styled-components";
import ChampionInfo from "./ChampionInfo";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 102px;
    border-radius: 6px;
    background-color: rgb(68, 33, 36);
    margin-top: 10px;   
`

const GameInfoColumn = styled.div`
    width: 165px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0px 10px 10px;

    h2 {
        font-size: 14px;
        font-weight: 700;
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
        color: white;
    }

    span {
        color: rgb(167, 167, 175);
        font-size: 12px;
    }
`



const PlayerListColumn = styled.div`
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const DropDownColumn = styled.div`
    width: 30px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #8c373e;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
`

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`



const MatchTab = () => {
    return(
        <Wrapper>
            <ContentWrapper>
                <GameInfoColumn>
                    <div>
                        <h2>Normal</h2>
                        <p>1 day ago</p>
                    </div>
                    <div>
                        <WinTime>
                            <p>Win</p>
                            <span>25:30</span>
                        </WinTime>
                        <p>Gold 1</p>
                    </div>
                </GameInfoColumn>
                <ChampionInfo/>
                <PlayerListColumn/>
            </ContentWrapper>
            
            <DropDownColumn/>
        </Wrapper>
    );
};

export default MatchTab;