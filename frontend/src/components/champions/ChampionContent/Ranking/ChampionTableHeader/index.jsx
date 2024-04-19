import styled from "styled-components";
import RankingTableHeader from "./RankingTableHeader";



const ChampionTableHeader = () => {
    return (
        <tr>
            <RankingTableHeader
            title={"Rank"}
            pos={"first"}
            />
            <RankingTableHeader
            title={"Champion"}
            left={true}
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
            pos={"last"}
            />
        </tr>
    );
};

export default ChampionTableHeader;