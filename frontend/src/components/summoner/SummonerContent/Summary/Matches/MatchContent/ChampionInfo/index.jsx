import styled from "styled-components";

const ChampionInfoColumn = styled.div`
    width: 350px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const ChampionInfoWrapper = styled.div`
    display: flex;
    width: 100px;
    align-items: center;
    height: 100%;
`

const ChampInfo = styled.div`
    display: flex;
    height: 46px;
`

const ChampionImageWrapper = styled.div`
    position: relative;
    margin-right: 2px;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 6px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            transform: scale(1.1);
        }

        span {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 18px;
            font-size: 10px;
            background-color: ${props => props.theme.default_background_color};
            border-radius: 3px;
            font-weight: 500;
            text-align: left;
            padding: 3px;
            
        }
    }
`

const SummonerSpellsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 2px;

    

    div {

        height: 22px;
        width: 22px;
        border-radius: 3px;
        background-color: white;

        &:first-child {
            margin-bottom: 2px;
        }
    }
`

const MatchStatsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
`

const KDA = styled.div`
    font-size: 17px;
    font-weight: 700;

    .slash {
        color: black;
        opacity: 0.4;
    }
`

const KDARatio = styled.div`
    margin-top: 6px;
    font-size: 12px;
    font-weight: 700;

    span {
        font-weight: 300;
        opacity: 0.6;
    }
`

const OtherText = styled.div`
    margin-top: 5px;
    font-size: 12px;
    font-weight: 300;
    opacity: 0.6;
`

const ItemWrapper = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    width: 100px;

    .Trinket {
        display: flex;
        justify-content: center;
        margin-left: 2px;
    }

    .Main {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 2px;
        justify-content: space-between;

        img {
            width: 22px;
            height: 22px;
        }
    }
`


const ChampionInfo = () => {
    return(
        <ChampionInfoColumn>
            <ChampionInfoWrapper>
                <ChampInfo>
                    <ChampionImageWrapper>
                        <div>
                            <img src="https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/6271.png" />
                            <span>18</span>
                        </div>
                    </ChampionImageWrapper>
                    
                </ChampInfo>
                <SummonerSpellsWrapper>
                    <div>

                    </div>
                    <div>
                        
                    </div>
                </SummonerSpellsWrapper>
                <SummonerSpellsWrapper>
                    <div>

                    </div>
                    <div>
                        
                    </div>
                </SummonerSpellsWrapper>
            </ChampionInfoWrapper>
            <MatchStatsWrapper>
                <KDA>
                    13
                    <span className="slash"> / </span>
                    7
                    <span className="slash"> / </span>
                    5
                </KDA>
                <KDARatio>
                    2.86 
                    <span> KDA</span>
                </KDARatio>
                <OtherText>238 CS (8)</OtherText>
                <OtherText>34 vision</OtherText>
            </MatchStatsWrapper>
            <ItemWrapper>
                    <div className="Main">
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/6271.png" />
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/6271.png" />
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/6271.png" />
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/6271.png" />
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/6271.png" />
                        <img src="https://ddragon.leagueoflegends.com/cdn/14.8.1/img/profileicon/6271.png" />
                    </div>
                    <div className="Trinket">
                        
                    </div>
            </ItemWrapper>
        </ChampionInfoColumn>
        
    );
};

export default ChampionInfo