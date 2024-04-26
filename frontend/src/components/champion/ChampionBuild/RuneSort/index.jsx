import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    background-color: #2e2e43;
    width: 210px;
    border-radius: 6px;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
    height: auto;
`

const Runes = styled.table`
    width: 100%;
`

const HeadRow = styled.tr`
    background-color: rgb(26, 26, 41);
    font-size: 12px;
   
    th {

         
        
        padding: 6px 0;

    }
    
`

const Tbody = styled.tbody`
    
    tr {
        &:nth-child(2n) {
            background-color: rgb(34, 34, 54);
        }

        td {
            vertical-align: middle;
        }
    }
`

const RuneTab = styled.td`
    padding-left: 12px;
`

const RuneImages = styled.div`
    display: flex;
    padding: 12px 0;
    div {
        margin-right: 5px;
    }
`

const RuneSort = () => {

    return(
        <Wrapper>   
            <Title>
                <span>Rune Core List</span>
            </Title>
            <Runes>
                <colgroup><col/><col width="53px"/><col width="50px"/></colgroup>
                <thead>
                    <HeadRow>
                        <th>Rune + Item</th>
                        <th>Pick Rate</th>
                        <th>WR</th>
                    </HeadRow>
                </thead>
                <Tbody>
                    <tr>
                        <RuneTab>
                            <RuneImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </RuneImages>
                            
                        </RuneTab>
                    </tr>
                    
                </Tbody>
            </Runes>
        </Wrapper>
    );
};

export default RuneSort;