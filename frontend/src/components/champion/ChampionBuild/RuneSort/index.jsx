import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";
import { PickRateTab, Table, Tbody, WinRateTab } from "../../../../styles/ChampionStyled";
import { HeadRow } from "../../Builds/PrimaryBuilds";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    background-color: #2e2e43;
    width: 240px;
    border-radius: 6px;
`

const Title = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px;
    height: auto;
    font-weight: 600;
`


const RuneTab = styled.td`
    padding-left: 20px;
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
            <Table>
                <colgroup><col/><col width="65px"/><col width="60px"/></colgroup>
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
                        <PickRateTab>
                            <p>26.7%</p>
                            <span>8,200</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>51.9%</p>
                        </WinRateTab>
                    </tr>
                    <tr>
                        <RuneTab>
                            <RuneImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </RuneImages>
                        </RuneTab>
                        <PickRateTab>
                            <p>26.7%</p>
                            <span>8,200</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>51.9%</p>
                        </WinRateTab>
                    </tr>
                    <tr>
                        <RuneTab>
                            <RuneImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </RuneImages>
                        </RuneTab>
                        <PickRateTab>
                            <p>26.7%</p>
                            <span>8,200</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>51.9%</p>
                        </WinRateTab>
                    </tr>
                    <tr>
                        <RuneTab>
                            <RuneImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </RuneImages>
                        </RuneTab>
                        <PickRateTab>
                            <p>26.7%</p>
                            <span>8,200</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>51.9%</p>
                        </WinRateTab>
                    </tr>
                </Tbody>
            </Table>
        </Wrapper>
    );
};

export default RuneSort;