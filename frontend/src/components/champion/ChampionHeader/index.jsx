import styled from "styled-components";
import SingleChampion from "../../ChampionImages/ChampionIcon";

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    background-color: #2e2e43;
    border-radius: 6px;
    padding: 20px;
    margin-top: 50px;
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;

`

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    h1 {
        font-size: 24px;
        font-weight: 700;
        margin-right: 10px;
    }
    span {
        font-size: 12px;
        opacity: 0.7;
        font-weight: 400;
    }
`

const Abilities = styled.div`
    display: flex;
    flex-direction: row;

    margin-top: 25px;

    div {
        &:not(:last-of-type) {
            margin-right: 5px;
        }
        border-radius: 6px;
    }
`

const Desription = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    font-size: 12px;
    opacity: 0.7;
    max-width: 450px;
`

const ChampionHeader = () => {
    return(
        <Wrapper>
            <SingleChampion className="BigChampion" championId={221} width={"100px"} height={"100px"}/>
            <TextWrapper>
                <Title>
                    <h1>Zeri</h1>
                    <span>Top Build, Emerald, Patch 14.8</span>
                </Title>
                <Abilities>
                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                    <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                </Abilities>
                <Desription>
                    <span>Build Guids for Bottom Zeri with LOLDATA AI.</span>
                    <span>The highest win rate Skarner runes, items, skill order, counter and patch history in patch 14.8.</span>
                </Desription>
            </TextWrapper>
        </Wrapper>
    );
};

export default ChampionHeader;