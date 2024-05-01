import styled from "styled-components";
import Champion from "..";
import { PickRateTab, Table, Tbody,  WinRateTab } from "../../../styles/ChampionStyled";
import SingleChampion from "../../ChampionImages/ChampionIcon";


const Wrapper = styled.div`
    display: flex;
    
    margin-top: 10px;
    border-radius: 6px;
    padding: 15px;
    background-color: rgb(34, 34, 54);
    
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 14px;
`

const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 33%;
    
    &:not(:last-child) {
        margin-right: 10px
    }
    background-color: #2e2e43;
`

const HeadRow = styled.tr`
    font-size: 12px;
    font-weight: 600;

    th {
        background-color: rgb(26, 26, 41);
        padding: 6px 0;
        position: sticky !important;
        z-index: 99;
        top: 0px;
        &:first-child {
            text-align: left;
            padding-left: 15px;
        }
    }
`

const Banner = styled.div`
    width: 100%;
    height: 4px;
    background-color: ${props => props.color}
`

const ChampionTab =  styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-weight: 600;

    
`
const ChampionImages = styled.div`
    padding: 10px 0;
    margin-right: 12px;
`

const TableWrapper = styled.div`
    position: relative;
    max-height: 250px;
    overflow: auto;
    &::-webkit-scrollbar-thumb {
        border-radius: 0px; 
    }
    &::-webkit-scrollbar-track {
        border-radius:0px;
    }
`


const ChampionCounters = ({ championData }) => {
    // Sort opponents based on win rate (highest to lowest)
    if (!championData) {
        return (<></>)
    }
    const sortedOpponents = Object.entries(championData.opponents).sort(([, a], [, b]) => b.winRate - a.winRate);
    console.log(sortedOpponents);
    return (
        <Wrapper>
        {/* Loop through opponents and render a row for each */}
        {sortedOpponents.map(([championId, opponentData]) => (
            <SectionWrapper key={championId}>
            <Banner color="rgb(241, 51, 83)" />
            <Header>Weak Against</Header>
            <TableWrapper>
                <Table>
                <colgroup>
                    <col />
                    <col width="65px" />
                    <col width="60px" />
                </colgroup>
                <thead>
                    <HeadRow>
                    <th>Champion</th>
                    <th>Pick Rate</th>
                    <th>Win Rate</th>
                    </HeadRow>
                </thead>
                <tbody>
                    <tr key={championId}>
                    <ChampionTab>
                        <ChampionImages>
                        {/* Render your champion image component here */}
                        </ChampionImages>
                        <span>{opponentData.name}</span>
                    </ChampionTab>
                    <PickRateTab>
                        <p>{opponentData.pickRate}</p>
                    </PickRateTab>
                    <WinRateTab>
                        <p>{opponentData.winRate}</p>
                    </WinRateTab>
                    </tr>
                </tbody>
                </Table>
            </TableWrapper>
            </SectionWrapper>
        ))}
        </Wrapper>
    );
};

export default ChampionCounters;

