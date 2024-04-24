import styled from "styled-components";
import SummonerStats from "./SummonerStats";
import Matches from "./Matches";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
`

const Summary = () => {
    return(
        <Wrapper>
            <SummonerStats/>
            <Matches />
        </Wrapper>
    );
};

export default Summary;