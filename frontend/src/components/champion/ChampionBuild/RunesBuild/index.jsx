import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";

const Wrapper = styled.div`
    background-color: rgb(34, 34, 54);
    
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border-radius: 6px;
`

const Title = styled.div`
    display: flex;
    background-color: #2e2e43;
    justify-content: center;
    width: 100%;
    padding: 10px;
    font-weight: 600;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
`

const RuneContent = styled.div`
    width: 100%;
    padding: 10px;
`

const Runes = styled.div`
    width: 100%;
    background-color: #2e2e43;
    border-radius: 6px;
`

const RunesHeader = styled.div`
    background-color: rgb(26, 26, 41);
    padding: 10px 7px;
    font-size: 12px;
    font-weight: 600;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    border: 1px solid #2e2e43;
`

const RunesBody = styled.div`
    display: flex;
    width: 100%;
    padding: 25px;
    justify-content: center;
    align-items: flex-end
    
`

const RuneWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 175px;
    &:not(:last-child) {
        margin-right: 75px;
        width: 200px;
    }
    
`;

const RuneTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.first ? `24px` : `32px`};
    gap: 10px;
    font-size: 14px;
    font-weight: 500;


`

const RuneRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
`

const Breaker = styled.div`
    width: 95%;
    margin-top: 14px;
    background-color:rgb(202, 215, 226);
    height: 1px;
    opacity: 0.6;
`
const RuneBuild = () => {
    return(
        <Wrapper>
            <Title>
                <span>Runes</span>
            </Title>
            <RuneContent>
                <Runes>
                    <RunesHeader> Runes</RunesHeader>
                    <RunesBody>
                        <RuneWrapper>
                            <RuneTitle first={true}>
                                <SingleChampion championId={221} width={"40px"} height={"40px"}/>
                                <h4> Conquerer</h4>
                            </RuneTitle>
                            <RuneRow>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                            </RuneRow>
                            <Breaker/>
                            <RuneRow>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                            </RuneRow>
                            <RuneRow>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                            </RuneRow>
                            <RuneRow>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                            </RuneRow>
                        </RuneWrapper>
                        <RuneWrapper>
                            <RuneTitle>
                                <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                                <h4> Conquerer</h4>
                            </RuneTitle>
                            <RuneRow>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                            </RuneRow>
                            <RuneRow>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                            </RuneRow>
                            <RuneRow>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                                <SingleChampion championId={221} width={"36px"} height={"36px"}/>
                            </RuneRow>
                        </RuneWrapper>
                        <RuneWrapper>
                            <RuneTitle>
                                
                                <h5> Rune Stats</h5>
                            </RuneTitle>
                            <RuneRow>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                            </RuneRow>
                            <RuneRow>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                            </RuneRow>
                            <RuneRow>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                                <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                            </RuneRow>
                        </RuneWrapper>
                    </RunesBody>
                </Runes>
            </RuneContent>
        </Wrapper>
    );
};

export default RuneBuild