import styled from "styled-components";
import RankingTableHeader from "../RankingTableHeader";

const Wrapper = styled.tr`
    background-color: #1a1a29
`



const ChampionTableHeader = () => {
    return (
        <Wrapper>
            <RankingTableHeader
            title={"Rank"}

            />
        </Wrapper>
    );
};

export default ChampionTableHeader;