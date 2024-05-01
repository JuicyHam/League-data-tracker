import styled from "styled-components";
import RankingTableHeader from "./RankingTableHeader";



const ChampionTableHeader = ({onSort}) => {
    const handleSort = (key) => {
        // Trigger sorting callback with the selected key
        onSort(key);
    };
    return (
        <tr>
            <RankingTableHeader
            title={"Rank"}
            pos={"first"}
            onSort={() => handleSort('rank')}
            />
            <RankingTableHeader
            title={"Champion"}
            left={true}
            />
            <RankingTableHeader
            

            />
            <RankingTableHeader
            title={"Position"}

            />
            <RankingTableHeader
            title={"Win"}
            onSort={() => handleSort('rank')}
            />
            <RankingTableHeader
            title={"Pick"}
            onSort={() => handleSort('rank')}
            />
            <RankingTableHeader
            title={"Ban"}
            onSort={() => handleSort('rank')}
            />
            <RankingTableHeader
            title={"Counter"}
            pos={"last"}
            />
        </tr>
    );
};

export default ChampionTableHeader;