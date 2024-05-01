import styled from "styled-components";
import Champion from "../../../Champion";
import SingleChampion from "../../../../../ChampionImages/ChampionIcon";
import RoleIcon from "../../../RoleIcon";
import { useAppData } from "../../../../../../contexts/AppDataContext";
import { Link } from "react-router-dom";

const Wrapper = styled.tr`
    height: 40px;
    z-index: 99;
    
    td:not(:last-of-type) {
        cursor: pointer;
    }
`
const Content = styled.td`
    vertical-align: middle;
    text-align: center;

    padding: 4px;
    font-size: 12px;
    color: rgba(234, 240, 236, 0.6);
`

const ChampionWrapper = styled(Link)`
    display: flex;
    text-align: left;
    align-items: center;
    
    span {
        margin-left: 10px;
        font-weight: 600;
        color: rgba(234, 240, 236, 1);
    }
`

const CounterWrapper = styled.div`
    display: flex;
    justify-content: center;
    div {
        margin-right: 2px;
        border-radius: 50%;
    }
`

const TierWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Tier = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: green;
    border-radius: 50%;
    font-size: 12px;
    width: 32px;
    height: 32px;

`

const ChampionTableContent = ({
    lane,
    championId,
    winRate,
    pickRate,
    banRate,
    counter,
    tier,
    rank,
}) => {
    const { championInfo } = useAppData();
    
    if (!championInfo) {
        return (
            <Wrapper>
                <Content>No champion info available</Content>
            </Wrapper>
        );
    }
    const championData = championInfo[championId]
    return (
        <Wrapper>
            <Content>
                <span>{rank}</span>
            </Content>
            <Content>
                <ChampionWrapper to={championData && `/champion/${championData.name}`}>
                    <SingleChampion championId={championId} />
                    <span>{championData && championData['name']}</span>
                </ChampionWrapper>
            </Content>
            <Content>
                <TierWrapper>
                    
                </TierWrapper>

                
            </Content>
            <Content>
                <RoleIcon role={lane.toLowerCase()} />
            </Content>
            <Content>
                <span>{winRate}%</span>
            </Content>
            <Content>
                <span>{pickRate}%</span>
            </Content>
            <Content>
                <span>{banRate}%</span>
            </Content>
            <Content>
                <CounterWrapper>
                    {counter.map((opponent, index) => (
                        <ChampionWrapper key={index}>
                            <SingleChampion championId={opponent.id} />
                        </ChampionWrapper>
                    ))}
                </CounterWrapper>
                
            </Content>
        </Wrapper>
    );
};

export default ChampionTableContent;