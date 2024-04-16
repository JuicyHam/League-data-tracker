import styled from "styled-components";
import RoleNav from "./RoleNav";
import ChampionOptions from "./ChampionOptions";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #2e2e43;
    margin-top: 10px;
    border-radius: 6px;
    padding: 6px;
    justify-content: space-between;
`


const ChampionHeader = () => {
    
    return (
        <Wrapper>
            <ChampionOptions/>
            <RoleNav/>
        </Wrapper>
    );
}

export default ChampionHeader;