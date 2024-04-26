import styled from "styled-components";
import SingleChampion from "../../../../../../ChampionImages/ChampionIcon";
import { useSummonerData } from "../../../../../../../contexts/summonerData";
import { useAppData } from "../../../../../../../contexts/AppDataContext";

const Wrapper = styled.div`
    width: 100%;
`

const Options = styled.div`
    width: 100%;
    display: flex;
    padding: 5px;
    background-color: #2e2e43;
` 

const QueueOption = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 10px;
    min-width: 75px;
    font-size: 12px;
    cursor: pointer;
    margin-right: 6px;
    background-color: ${props => props.selected ? `rgb(26, 26, 41)` : `Transparent`};
    border-radius: 6px;
    font-weight: 400;
    color: rgb(234, 240, 236);
    opacity: ${props => props.selected ? `1` : `0.6`};
    transition: background-color 0.3s ease;
    &:hover {
        background-color: rgb(26, 26, 41);
        opacity: 1;
    }
`

const StatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

`

const Table = styled.table`
    position: relative;
    width: 100%;
`

const FirstHeader = styled.th`
    height: 35px;
    background-color: rgb(26, 26, 41);
    vertical-align: middle;
    font-size: 13px;
    span {
        opacity: 0.7;
    }
`

const OtherHeader = styled.th`
    background-color: rgb(26, 26, 41);
    vertical-align: middle;

    span {
        font-size: 13px;
        font-weight: 500;
    }
`

const WinLossWrapper = styled.div`
    display: flex;
    margin-left: 8px;
    align-items: center;
    gap: 5px;
`

const WinLoss = styled.div`
    padding: 4px 5px;
    color: ${props => props.$win ? `#778de4` : `rgb(241, 51, 83)`}; 
    background-color: ${props => props.$win ? `#283774` : `#542a2e`};
    font-weight: 600;
    border-radius: 6px;
`

const PlayerRow = styled.tr`
    background-color: ${props =>
        (props.$win && props.selected) ? `#2b3b7a` :
        (props.$win && !props.selected) ? `#1e2b5e` :
        (!props.$win && props.selected) ? `#5e2d31` :
        `#442124`};
    border-top: 1px solid rgb(26, 26, 41);
`

const TableData = styled.td`
    height: 42px;
    vertical-align: middle;
`

const ChampionInfo = styled.div`
    display: flex;
    width: 100%;
    padding: 0 10px;
`
const SummonerSpellsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 3px;

    

    div {

        height: 17px;
        width: 17px;
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

const PlayerInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    
    span {
        font-size: 11px;
        opacity: 0.7;
        font-weight: 300;
    }
    p {
        font-size: 12px;
        margin-right: 3px;
    }
`


const PlayerName = styled.div`
    max-width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
`

const EvalScoreWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        font-size: 12px;
        margin-left: 2px;
    }

`

const EvalScore = styled.div`
    margin-top: 6px;
    margin-bottom: 5px;
    background-color: rgb(243, 166, 52);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 14px;
`

const KdaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 2px;
    p {
        font-weight: 600;
        
    }

    span {
        font-weight: 400;
        opacity: 0.7;
    }

    font-size: 12px;
`

const DamageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
    gap: 5px;
    span {
        font-size: 12px;
        font-weight: 500;
    }

    
`

const DamageLine = styled.div`
    display: flex;
    width: 100%;
    height: 5px;
    background-color: rgb(26, 26, 41);
    justify-content: flex-end;
    div {
        width: ${props => props.width || `0px`};
        background-color: rgb(239, 77, 138);
        height: 100%;
    }
`

const ItemWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-item: center;

    img {
        width: 20px;
        height: 20px;
        margin-right: 2px;
        border-radius: 3px;
    }

    div {
        width: 20px;
        height: 20px;
        margin-right: 2px;
        border-radius: 3px;
        background-color: ${props => props.$win ? `#283774` : `#542a2e`};
    }

   
`


const Results = ({index}) => {
    const {summonerData} = useSummonerData();
    const {itemIcons, summonerSpellsIcon, runesIcon} = useAppData();

    const match = summonerData.matches && summonerData.matches[index];
    const puuid = summonerData.accountInfo.puuid;
    if (!match) {
        return <div>No match found</div>;
    }
    const ourSummoner = match.participants.find(participant => participant.puuid === puuid);
    const team1Participants = match.participants.filter(participant => participant.teamId === 100);
    const team2Participants = match.participants.filter(participant => participant.teamId === 200);
    let highestDamage = 0;
    match.participants.forEach(participant => {
        if (participant.totalDamageDealtToChampions > highestDamage) {
            highestDamage = participant.totalDamageDealtToChampions;
        }
    });
    const matchTime = Math.floor(match.gameDuration / 60);
    return(
        <Wrapper>
            <Options>
                <QueueOption selected={true}>Stats</QueueOption>
                <QueueOption>Build</QueueOption>
            </Options>
            <StatWrapper>
                <Table>
                    <colgroup><col width="27%"/><col width="10%"/><col width="9%"/><col width="8%"/><col width="7%"/><col width="7%"/><col width="21%"/></colgroup>
                    <thead>
                        <tr>
                            <FirstHeader>
                                <WinLossWrapper>
                                    <WinLoss $win={team1Participants[0].win}>{team1Participants[0].win ? `Win` : `Loss`}</WinLoss>
                                    <span>{team1Participants[0].teamId === 100 ? `(blue team)` : `(red team)`}</span>
                                </WinLossWrapper>
                                
                            </FirstHeader>
                            <OtherHeader>
                                <span>Eval Score</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>KDA</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>Damage</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>CS</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>Wards</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>Items</span>
                            </OtherHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {team1Participants.map((participant, i) => (
                            <PlayerRow key = {participant.puuid}  $win={participant.win} selected={participant.puuid===puuid}>
                                <TableData>
                                    <ChampionInfo>
                                        <SingleChampion championId={participant.championId} width={"36px"} height={"36px"}/>
                                        <SummonerSpellsWrapper $win={participant.win}>
                                            <div>
                                                <img src={summonerSpellsIcon[participant.summoner1Id]}/>
                                            </div>
                                            <div>
                                                <img src={summonerSpellsIcon[participant.summoner2Id]}/>  
                                            </div>
                                        </SummonerSpellsWrapper>
                                        <SummonerSpellsWrapper $win={participant.win}>
                                            <div>
                                                <img src={runesIcon[participant.perks.styles[0].selections[0].perk]}/>
                                            </div>
                                            <div>
                                                <img src={runesIcon[participant.perks.styles[1].style]}/>  
                                            </div>
                                        </SummonerSpellsWrapper>
                                        <PlayerInfo>
                                            <PlayerName>
                                                <p>{participant.riotIdGameName}</p>
                                                <span>#{participant.riotIdTagline}</span>
                                            </PlayerName>
                                            
                                            <div>
                                                <span>Unranked</span>
                                            </div>
                                            
                                        </PlayerInfo>
                                    </ChampionInfo>
                                </TableData>
                                <TableData>
                                    <EvalScoreWrapper>
                                        <EvalScore>50</EvalScore>
                                        <span>10th</span>
                                    </EvalScoreWrapper>
                                </TableData>
                                <TableData>
                                    <KdaWrapper>
                                        <span>{participant.kills} / {participant.deaths} /{participant.assists}</span>
                                        <p>
                                            {participant.deaths === 0 || !isFinite((participant.kills + participant.assists) / participant.deaths)
                                            ? `${participant.kills + participant.assists}`
                                            : ((participant.kills + participant.assists) / participant.deaths).toFixed(2)} 
                                        </p>
                                    </KdaWrapper>
                                </TableData>
                                <TableData>
                                    <DamageWrapper>
                                        <span>{participant.totalDamageDealtToChampions}</span>
                                        <DamageLine  width={`${Math.ceil((participant.totalDamageDealtToChampions / highestDamage) * 100)}%`}>
                                            <div/>
                                        </DamageLine>
                                    </DamageWrapper>
                                </TableData>
                                <TableData>
                                    <KdaWrapper>
                                        <span>{participant.totalMinionsKilled + participant.neutralMinionsKilled}</span>
                                        <p>{((participant.totalMinionsKilled + participant.neutralMinionsKilled)/matchTime).toString().substring(0, 3)}/m</p>
                                    </KdaWrapper>
                                </TableData>
                                <TableData>
                                    <KdaWrapper>
                                        <span>{participant.visionWardsBoughtInGame}</span>
                                        <span>{participant.wardsPlaced} / {participant.wardsKilled}</span>
                                    </KdaWrapper>
                                </TableData>
                                <TableData>
                                    <ItemWrapper $win={participant.win}>
                                    {[0, 1, 2, 3, 4, 5, 6].map(slot => (
                                        participant[`item${slot}`] !== 0 ? (
                                            <img key={slot} src={itemIcons[participant[`item${slot}`]]} alt={`Item ${participant[`item${slot}`]}`} />
                                        ) : (
                                            <div key={slot} ></div>
                                        )
                                    ))}
                                    </ItemWrapper>
                                </TableData>
                            </PlayerRow>
                        ))}
                    </tbody>
                </Table>
                <Table>
                    <colgroup><col width="27%"/><col width="10%"/><col width="9%"/><col width="8%"/><col width="7%"/><col width="7%"/><col width="21%"/></colgroup>
                    <thead>
                        <tr>
                            <FirstHeader>
                                <WinLossWrapper>
                                    <WinLoss $win={team2Participants[0].win}>{team2Participants[0].win ? `Win` : `Loss`}</WinLoss>
                                    <span>{team2Participants[0].teamId === 100 ? `(blue team)` : `(red team)`}</span>
                                </WinLossWrapper>
                                
                            </FirstHeader>
                            <OtherHeader>
                                <span>Eval Score</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>KDA</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>Damage</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>CS</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>Wards</span>
                            </OtherHeader>
                            <OtherHeader>
                                <span>Items</span>
                            </OtherHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {team2Participants.map((participant, i) => (
                            <PlayerRow key = {participant.puuid}  $win={participant.win} selected={participant.puuid===puuid}>
                                <TableData>
                                    <ChampionInfo>
                                        <SingleChampion championId={participant.championId} width={"36px"} height={"36px"}/>
                                        <SummonerSpellsWrapper $win={participant.win}>
                                            <div>
                                                <img src={summonerSpellsIcon[participant.summoner1Id]}/>
                                            </div>
                                            <div>
                                                <img src={summonerSpellsIcon[participant.summoner2Id]}/>  
                                            </div>
                                        </SummonerSpellsWrapper>
                                        <SummonerSpellsWrapper $win={participant.win}>
                                            <div>
                                                <img src={runesIcon[participant.perks.styles[0].selections[0].perk]}/>
                                            </div>
                                            <div>
                                                <img src={runesIcon[participant.perks.styles[1].style]}/>  
                                            </div>
                                        </SummonerSpellsWrapper>
                                        <PlayerInfo>
                                            <PlayerName>
                                                <p>{participant.riotIdGameName}</p>
                                                <span>#{participant.riotIdTagline}</span>
                                            </PlayerName>
                                            
                                            <div>
                                                <span>Unranked</span>
                                            </div>
                                            
                                        </PlayerInfo>
                                    </ChampionInfo>
                                </TableData>
                                <TableData>
                                    <EvalScoreWrapper>
                                        <EvalScore>50</EvalScore>
                                        <span>10th</span>
                                    </EvalScoreWrapper>
                                </TableData>
                                <TableData>
                                    <KdaWrapper>
                                        <span>{participant.kills} / {participant.deaths} /{participant.assists}</span>
                                        <p>
                                            {participant.deaths === 0 || !isFinite((participant.kills + participant.assists) / participant.deaths)
                                            ? `${participant.kills + participant.assists}`
                                            : ((participant.kills + participant.assists) / participant.deaths).toFixed(2)} 
                                        </p>
                                    </KdaWrapper>
                                </TableData>
                                <TableData>
                                    <DamageWrapper>
                                        <span>{participant.totalDamageDealtToChampions}</span>
                                        <DamageLine  width={`${Math.ceil((participant.totalDamageDealtToChampions / highestDamage) * 100)}%`}>
                                            <div/>
                                        </DamageLine>
                                    </DamageWrapper>
                                </TableData>
                                <TableData>
                                    <KdaWrapper>
                                        <span>{participant.totalMinionsKilled + participant.neutralMinionsKilled}</span>
                                        <p>{((participant.totalMinionsKilled + participant.neutralMinionsKilled)/matchTime).toString().substring(0, 3)}/m</p>
                                    </KdaWrapper>
                                </TableData>
                                <TableData>
                                    <KdaWrapper>
                                        <span>{participant.visionWardsBoughtInGame}</span>
                                        <span>{participant.wardsPlaced} / {participant.wardsKilled}</span>
                                    </KdaWrapper>
                                </TableData>
                                <TableData>
                                    <ItemWrapper $win={participant.win}>
                                    {[0, 1, 2, 3, 4, 5, 6].map(slot => (
                                        participant[`item${slot}`] !== 0 ? (
                                            <img key={slot} src={itemIcons[participant[`item${slot}`]]} alt={`Item ${participant[`item${slot}`]}`} />
                                        ) : (
                                            <div key={slot} ></div>
                                        )
                                    ))}
                                    </ItemWrapper>
                                </TableData>
                            </PlayerRow>
                        ))}
                    </tbody>
                </Table>
            </StatWrapper>
        </Wrapper>
    );
};

export default Results;