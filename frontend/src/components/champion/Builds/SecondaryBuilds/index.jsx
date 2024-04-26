import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";
import { HeadRow, ItemTab, PickRateTab, Table, Tbody, WinRateTab } from "../../../../styles/ChampionStyled";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-left: 10px;
`

const Starter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color:  #2e2e43;
    border: 1px solid #2e2e43; /* Border for the th element */
    border-radius: 6px;
    &:last-of-type {
        margin-top: 10px;
    }
`

const ItemImages = styled.div`
    display: flex;
    padding: 14.5px 0;
    div {
        margin-right: 8px;
    }
`





const SecondaryBuilds = () => {
    return(
        <Wrapper>
            <Starter>
                <Table>
                    <colgroup><col/><col width="65px"/><col width="60px"/></colgroup>
                    <thead>
                        <HeadRow>
                            
                            <th>Starter Item</th>
                            <th>Pick Rate</th>
                            <th>WR</th>
                            
                        </HeadRow>
                    </thead>
                    <Tbody>
                        <tr>
                            <ItemTab>
                                <ItemImages>
                                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                </ItemImages>
                            </ItemTab>
                            <PickRateTab>
                                <p>26.7%</p>
                                <span>8,200</span>
                            </PickRateTab>
                            <WinRateTab>
                                <p>50%</p>
                            </WinRateTab>
                        </tr>
                        <tr>
                            <ItemTab>
                                <ItemImages>
                                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                </ItemImages>
                            </ItemTab>
                            <PickRateTab>
                                <p>26.7%</p>
                                <span>8,200</span>
                            </PickRateTab>
                            <WinRateTab>
                                <p>50%</p>
                            </WinRateTab>
                        </tr>
                    </Tbody>
                </Table>
            </Starter>
            <Starter>
                <Table>
                    <colgroup><col/><col width="65px"/><col width="60px"/></colgroup>
                    <thead>
                        <HeadRow>
                            <th>Boots</th>
                            <th>Pick Rate</th>
                            <th>WR</th>
                        </HeadRow>
                    </thead>
                    <Tbody>
                        <tr>
                            <ItemTab>
                                <ItemImages>
                                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                </ItemImages>
                            </ItemTab>
                            <PickRateTab>
                                <p>26.7%</p>
                                <span>8,200</span>
                            </PickRateTab>
                            <WinRateTab>
                                <p>50%</p>
                            </WinRateTab>
                        </tr>
                        <tr>
                            <ItemTab>
                                <ItemImages>
                                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                </ItemImages>
                            </ItemTab>
                            <PickRateTab>
                                <p>26.7%</p>
                                <span>8,200</span>
                            </PickRateTab>
                            <WinRateTab>
                                <p>50%</p>
                            </WinRateTab>
                        </tr>
                    </Tbody>
                </Table>
            </Starter>
        </Wrapper>
    );
};

export default SecondaryBuilds;