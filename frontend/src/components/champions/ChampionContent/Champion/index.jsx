import styled from "styled-components";
import ChampionIcons from "../ChampionList";

const Wrapper = styled.div`
    width: 340px;
    background-color: #2e2e43;
    border-radius: 6px;
    margin-right: 10px;
    height: 100%;
`

const Champion = () => {
    return (
        <Wrapper>
            <ChampionIcons/>
        </Wrapper>
    )
}

export default Champion;