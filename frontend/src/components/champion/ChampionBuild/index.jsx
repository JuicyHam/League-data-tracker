import styled from "styled-components";
import RuneSort from "./RuneSort";
import RuneBuild from "./RunesBuild";

const Wrapper = styled.div`
    display: flex;
    
    width: 100%;
    margin-top: 10px;
`

const ChampionBuild = () => {
    return(
        <Wrapper>
            <RuneSort/>
            <RuneBuild/>
        </Wrapper>
    );
};

export default ChampionBuild;