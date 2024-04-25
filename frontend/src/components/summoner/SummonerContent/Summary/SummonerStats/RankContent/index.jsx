import styled from "styled-components";
import { useSummonerData } from "../../../../../../contexts/summonerData";

const Wrapper = styled.div`
    
    display: flex;
    flex-direction: column;
    
    

    
`

const RankWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #2e2e43;
    border-radius: 6px;
    &:last-of-type {
        margin-top: 10px;
    }
`

const Title = styled.h2`
    font-size: 14px;
    font-weight: 400;
    padding: 15px;
    
    
`

const Content = styled.div`
    display: flex;
    padding: 15px 12px;
    align-items: center;
    border-top: 1px solid black;
`

const RankImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3d3d55;
    border-radius: 50%;
    width: 72px;
    height: 72px;
    margin-right: 5px;

    img {
        height: 80%;
        width: 80%;
        padding-top: 7px;
    }
`
const RankText = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-left: 5px;
    gap: 8px;
    h3 {
        font-size: 18px;
        font-weight: 900;
        
    }
    p {
        font-size: 12px;
        font-weight: 300;
    }
`

const WinLose = styled.div`
    font-size: 11px;
    text-align: right;
    display: flex;
    flex-direction:column;
    gap: 8px;
`

const RankContent = () => {
    const {summonerData} = useSummonerData();
    const {ranked} = summonerData;

    const soloRankedMode = ranked.find(mode => mode.queueType === "RANKED_SOLO_5x5");
    const flexRankedMode = ranked.find(mode => mode.queueType === "RANKED_FLEX_SR");

    return(
        <Wrapper>
            <RankWrapper>
                <Title>Ranked Solo</Title>
                {soloRankedMode && <Content>
                    <RankImage>
                        <img src={`/Ranks/${soloRankedMode.tier}.png`} />
                    </RankImage>
                    <RankText>
                        <h3>{soloRankedMode.tier} {["CHALLENGER", "GRANDMASTER", "MASTER"].includes(soloRankedMode.tier) ? "" : soloRankedMode.rank}</h3>
                        <p>{soloRankedMode.leaguePoints} LP</p>
                    </RankText>
                    <WinLose>
                        <p>{soloRankedMode.wins}W {soloRankedMode.losses}L</p>
                        <p>Win Rate {Math.floor((soloRankedMode.wins/(soloRankedMode.wins+soloRankedMode.losses)) * 100)}%</p>
                    </WinLose>
                </Content> }
            </RankWrapper>
            <RankWrapper>
                <Title>Ranked Flex</Title>
                {flexRankedMode && <Content>
                    <RankImage>
                        <img src={`/Ranks/${flexRankedMode.tier}.png`} />
                    </RankImage>
                    <RankText>
                        <h3>{flexRankedMode.tier} {["CHALLENGER", "GRANDMASTER", "MASTER"].includes(flexRankedMode.tier) ? "" : flexRankedMode.rank}</h3>
                        <p>{flexRankedMode.leaguePoints} LP</p>
                    </RankText>
                    <WinLose>
                        <p>{flexRankedMode.wins}W {flexRankedMode.losses}L</p>
                        <p>Win Rate {Math.floor((flexRankedMode.wins/(flexRankedMode.wins+flexRankedMode.losses)) * 100)}%</p>
                    </WinLose>
                </Content> }
            </RankWrapper>
            
        </Wrapper>
    );
};

export default RankContent;