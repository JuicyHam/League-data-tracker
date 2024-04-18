import styled from "styled-components";
import Champion from "../../../Champion";

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
                <span>{championName}</span>
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