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

const Ranking = () => {
    return (
            
        <Wrapper>
            <RanksTable>
                <colgroup>
                    <col width={'12%'}/>
                    <col/>
                    <col width={'15%'}/>
                    <col width={'15%'}/>
                    <col width={'15%'}/>
                    <col width={'15%'}/>
                    <col width={'15%'}/>
                </colgroup>
            
                <thead>
                    <ChampionTableHeader/>
                </thead>
                <TBody>
                    <tr>
                        <td>January</td>
                        <td>$10,000</td>
                        <td>$7,000</td>
                        <td>$3,000</td>
                    </tr>
                    <tr>
                        <td>February</td>
                        <td>$12,000</td>
                        <td>$8,000</td>
                        <td>$4,000</td>
                    </tr>
                    <tr>
                        <td>January</td>
                        <td>$10,000</td>
                        <td>$7,000</td>
                        <td>$3,000</td>
                    </tr>
                    <tr>
                        <td>February</td>
                        <td>$12,000</td>
                        <td>$8,000</td>
                        <td>$4,000</td>
                    </tr>
                    <tr>
                        <td>January</td>
                        <td>$10,000</td>
                        <td>$7,000</td>
                        <td>$3,000</td>
                    </tr>
                    <tr>
                        <td>February</td>
                        <td>$12,000</td>
                        <td>$8,000</td>
                        <td>$4,000</td>
                    </tr>
                </TBody>
            </RanksTable>
        </Wrapper>
    )
}

export default Ranking;