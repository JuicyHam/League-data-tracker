import styled from "styled-components";
import RankingTableHeader from "./RankingTableHeader";

const Wrapper = styled.tr`
    background-color: #1a1a29
`



const ChampionTableHeader = () => {
    return (
        <Wrapper>
            <RankingTableHeader
            title={"Rank"}

            />
            <RankingTableHeader
            title={"Champion"}

            />
            <RankingTableHeader
            title={"Tier"}

            />
            <RankingTableHeader
            title={"Position"}

            />
            <RankingTableHeader
            title={"Win"}

            />
            <RankingTableHeader
            title={"Pick"}

            />
            <RankingTableHeader
            title={"Ban"}

            />
            <RankingTableHeader
            title={"Counter"}

            />
        </Wrapper>
    );
};

export default ChampionTableHeader;