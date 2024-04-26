import styled from "styled-components";
import { useSummonerData } from "../../../../../../../contexts/summonerData";
import { useAppData } from "../../../../../../../contexts/AppDataContext";
import SingleChampion from "../../../../../../ChampionImages/ChampionIcon";

const ChampionInfoColumn = styled.div`
    width: 325px;
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
        background-color: ${props => props.$win ? `#283774` : `#542a2e`};

        &:first-child {
            margin-bottom: 2px;
        }

        img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
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
        color: ${props => props.$win ? `#6f6ff5` : `#be4444`};
        opacity: 0.4;
    }

    span {
        color: #f56f6f;
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

const Items = styled.div`
    display: flex;
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
        height: 100%;
    }
    img {
        width: 22px;
        height: 22px;
        border-radius: 3px;
    }

    .Empty {
        width: 22px;
        height: 22px;
        border-radius: 3px;
        background-color: ${props => props.$win ? `#283774` : `#542a2e`};
    }


    .Main {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 2px;
        justify-content: space-between;
    }
`


const ChampionInfo = ({index}) => {
    const {summonerData} = useSummonerData();
    const {itemIcons, summonerSpellsIcon, runesIcon} = useAppData();

    const match = summonerData.matches && summonerData.matches[index];
    const puuid = summonerData.accountInfo.puuid;
    if (!match) {
        return <div>No match found</div>;
    }
    const matchTime = Math.floor(match.gameDuration / 60);
    const ourSummoner = match.participants.find(participant => participant.puuid === puuid);
    if (!ourSummoner) {
        return <div>Summoner not found in this match</div>;
    }
    const win = ourSummoner.win;
    const totalCs = ourSummoner.totalMinionsKilled + ourSummoner.neutralMinionsKilled
    const csPerMin = ((totalCs)/matchTime).toString().substring(0, 3);
    const KDAnumber = ((ourSummoner.kills + ourSummoner.assists) / ourSummoner.deaths).toString().substring(0, 3);
    return(
        <ChampionInfoColumn>
            <ChampionInfoWrapper>
                <ChampInfo>
                    <ChampionImageWrapper>
                        <div>
                            <SingleChampion championId={ourSummoner.championId} />
                            <span>18</span>
                        </div>
                    </ChampionImageWrapper>
                    
                </ChampInfo>
                <SummonerSpellsWrapper $win={win}>
                    <div>
                        <img src={summonerSpellsIcon[ourSummoner.summoner1Id]} />
                    </div>
                    <div>
                        <img src={summonerSpellsIcon[ourSummoner.summoner2Id]} />
                    </div>
                </SummonerSpellsWrapper>
                <SummonerSpellsWrapper $win={win}>
                    <div>
                        <img src={runesIcon[ourSummoner.perks.styles[0].selections[0].perk]}/>
                    </div>
                    <div>
                        <img src={runesIcon[ourSummoner.perks.styles[1].style]}/>  
                    </div>
                </SummonerSpellsWrapper>
            </ChampionInfoWrapper>
            <MatchStatsWrapper>
                <KDA $win={ourSummoner.win}>
                    {ourSummoner.kills}
                    <span className="slash"> / </span>
                    <span>{ourSummoner.deaths}</span>
                    <span className="slash"> / </span>
                    {ourSummoner.assists}
                </KDA>
                <KDARatio>
                    {KDAnumber}
                    <span> KDA</span>
                </KDARatio>
                <OtherText>{totalCs} ({csPerMin})</OtherText>
                <OtherText>{ourSummoner.visionScore} vision</OtherText>
            </MatchStatsWrapper>
            <ItemWrapper $win={win}>
                <Items >
                    <div className="Main" >
                        {[0, 1, 2, 3, 4, 5].map(slot => (
                            ourSummoner[`item${slot}`] !== 0 ? (
                                <img key={slot} src={itemIcons[ourSummoner[`item${slot}`]]} alt={`Item ${ourSummoner[`item${slot}`]}`} />
                            ) : (
                                <div key={slot} className="Empty" ></div>
                            )
                        ))}
                    </div>
                    <div className="Trinket">
                        <img src={itemIcons[ourSummoner.item6]}  />
                    </div>
                </Items>
                    
            </ItemWrapper>
        </ChampionInfoColumn>
        
    );
};

export default ChampionInfo