import styled from "styled-components";
import Champion from "../../../Champion";
import SingleChampion from "../../../ChampionIcon";

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
`

const ChampionWrapper = styled.div`
    display: flex;
    text-align: left;
    align-items: center;

    span {
        margin-left: 10px;
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
                <span>{lane}</span>
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