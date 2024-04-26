import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";
import { Arrow, ItemImages, ItemTab, PickRateTab, Table, Tbody, WinRateTab } from "../../../../styles/ChampionStyled";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #2e2e43;
    border-radius: 6px;
    border: 1px solid #2e2e43;
`


export const HeadRow = styled.tr`
    font-size: 12px;
    font-weight: 600;

    th {
        background-color: rgb(26, 26, 41);
        padding: 6px 0;
        &:first-child {
            border-top-left-radius: 6px;
            text-align: left;
            padding-left: 25px;
        }
        &:last-child {
            border-top-right-radius: 6px;
        }
    }
`;




const PrimaryBuilds = () => {
    return(
        <Wrapper>
            <Table>
                <colgroup><col/><col width="125px"/><col width="125px"/></colgroup>
                <thead>
                    <HeadRow>
                        <th>Items</th>
                        <th>Pick Rate</th>
                        <th>Win Rate</th>
                    </HeadRow>
                </thead>
                <Tbody>
                    <tr>
                        <ItemTab>
                            <ItemImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </ItemImages>
                        </ItemTab>
                        <PickRateTab>
                            <p>25%</p>
                            <span>2500 Gmeas</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>55%</p>
                        </WinRateTab>
                    </tr>
                    <tr>
                        <ItemTab>
                            <ItemImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </ItemImages>
                        </ItemTab>
                        <PickRateTab>
                            <p>25%</p>
                            <span>2500 Gmeas</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>55%</p>
                        </WinRateTab>
                    </tr>
                    <tr>
                        <ItemTab>
                            <ItemImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </ItemImages>
                        </ItemTab>
                        <PickRateTab>
                            <p>25%</p>
                            <span>2500 Gmeas</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>55%</p>
                        </WinRateTab>
                    </tr>
                    <tr>
                        <ItemTab>
                            <ItemImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </ItemImages>
                        </ItemTab>
                        <PickRateTab>
                            <p>25%</p>
                            <span>2500 Gmeas</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>55%</p>
                        </WinRateTab>
                    </tr>
                    <tr>
                        <ItemTab>
                            <ItemImages>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <Arrow/>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                            </ItemImages>
                        </ItemTab>
                        <PickRateTab>
                            <p>25%</p>
                            <span>2500 Gmeas</span>
                        </PickRateTab>
                        <WinRateTab>
                            <p>55%</p>
                        </WinRateTab>
                    </tr>
                </Tbody>
            </Table>
        </Wrapper>
    );
};

export default PrimaryBuilds;