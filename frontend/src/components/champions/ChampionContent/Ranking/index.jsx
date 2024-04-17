import styled from "styled-components";
import ChampionTableHeader from "./ChampionTableHeader";



const Wrapper = styled.main`
    width: 750px;
    background-color: #2e2e43;
    border-radius: 6px;
`
const RanksTable = styled.table`
    width: 100%;    
    border-collapse: collapse;
    table-layout: auto;
`

const TBody = styled.tbody`

  tr:nth-child(even) {
    background-color: #202033;;
  }
`;

const initSort = [{
    value: 'rank',
    sortType: false,
    reverseSort: true,
}];

const initSortList = {
    rank: {
        value: 'rank',
        sortType: false,
        reverseSort: true,
    },
    tier: {
        value: 'tier',
        sortType: true,
        reverseSort: true,
    },
    ai_score: {
        value: 'ai_score',
        sortType: true,
    },
    win_rate: {
        value: 'win_rate',
        sortType: true,
    },
    pick_rate: {
        value: 'pick_rate',
        sortType: true,
    },
    ban_rate: {
        value: 'ban_rate',
        sortType: true,
    },
}

const Ranking = () => {

    


    return (
            
        <Wrapper>
            <RanksTable>
                <colgroup>
                    <col width="48" />
                    <col width="*" />
                    <col width="56" />
                    <col width="56" />
                    <col width="94" />
                    <col width="110" />
                    <col width="94" />
                    <col width="135" />
                        
                </colgroup>
            
                <thead>
                    <ChampionTableHeader/>
                </thead>
                <TBody>
                </TBody>
            </RanksTable>
        </Wrapper>
    )
}

export default Ranking;