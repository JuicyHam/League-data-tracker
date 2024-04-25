import styled from "styled-components";
import Champion from "../../../Champion";
import SingleChampion from "../../../../../ChampionImages/ChampionIcon";
import RoleIcon from "../../../RoleIcon";

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

const ChampionWrapper = styled.div`
    display: flex;
    text-align: left;
    align-items: center;
    
    span {
        margin-left: 10px;
        font-weight: 600;
        color: rgba(234, 240, 236, 1);
    }
`

const ChampionTableContent = ({
                lane,
                championName,
                winRate,
                pickRate,
                banRate,
                counter,
                tier,
                rank,
                                }) => {
    return (
        <Wrapper>
            <Content>
                <span>{rank}</span>
            </Content>
            <Content>
                <ChampionWrapper>
                    <SingleChampion championName={championName}/>
                    <span>{championName}</span>
                </ChampionWrapper>
                
            </Content>
            <Content>
                <span>{tier}</span>
            </Content>
            <Content>
                <RoleIcon role={lane.toLowerCase()}/>
            </Content>
            <Content>
                <span>{winRate}</span>
            </Content>
            <Content>
                <span>{pickRate}</span>
            </Content>
            <Content>
                <span>{banRate}</span>
            </Content>
            <Content>
                <span>{counter}</span>
            </Content>
        </Wrapper>
    );
}

export default ChampionTableContent;