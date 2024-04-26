import styled from "styled-components";
import SingleChampion from "../../../../../../ChampionImages/ChampionIcon";

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
    color: rgb(241, 51, 83);
    background-color: rgb(63, 28, 31);
    border-radius: 6px;
`

const PlayerRow = styled.tr`
    background-color: ${props => props.$win ? `#1e2b5e` : `rgb(68, 33, 36)`};
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
        background-color: ${props => props.win ? `#283774` : `#542a2e`};

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
    }
`


const Results = () => {
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
                                    <WinLoss>Loss</WinLoss>
                                    <span>(Blue Team)</span>
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
                        <PlayerRow>
                            <TableData>
                                <ChampionInfo>
                                    <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                    <SummonerSpellsWrapper win={false}>
                                        <div>
                                            <img src={""}/>
                                        </div>
                                        <div>
                                            <img src={""}/>  
                                        </div>
                                    </SummonerSpellsWrapper>
                                    <SummonerSpellsWrapper win={false}>
                                        <div>
                                            <img src={""}/>
                                        </div>
                                        <div>
                                            <img src={""}/>  
                                        </div>
                                    </SummonerSpellsWrapper>
                                    <PlayerInfo>
                                        <PlayerName>
                                            <p>JuicyHam</p>
                                            <span>#EUW</span>
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
                                    <span>13 / 0 /5</span>
                                    <p>0.17</p>
                                </KdaWrapper>
                            </TableData>
                            <TableData>
                                <DamageWrapper>
                                    <span>16,700</span>
                                    <DamageLine width={"50%"}>
                                        <div/>
                                    </DamageLine>
                                </DamageWrapper>
                            </TableData>
                            <TableData>
                                <KdaWrapper>
                                    <span>158</span>
                                    <p>4.8/m</p>
                                </KdaWrapper>
                            </TableData>
                            <TableData>
                                <KdaWrapper>
                                    <span>0</span>
                                    <span>7 / 1</span>
                                </KdaWrapper>
                            </TableData>
                            <TableData>
                                <ItemWrapper>
                                    <img src={""}></img>
                                    <img src={""}></img>
                                    <img src={""}></img>
                                    <img src={""}></img>
                                    <img src={""}></img>
                                    <img src={""}></img>
                                    <img src={""}></img>
                                </ItemWrapper>
                            </TableData>
                        </PlayerRow>
                    </tbody>
                </Table>
            </StatWrapper>
        </Wrapper>
    );
};

export default Results;