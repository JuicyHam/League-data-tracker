import styled from "styled-components";
import ChampionIcons from "../ChampionList";
import RoleIconsOptions from "./RoleIconsOptions";
import ChampionSearchbar from "./ChampionSearchBar";

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
            <ChampionSearchbar/>
            <RoleIconsOptions/>
            <ChampionIcons/>
        </Wrapper>
    )
}

export default Champion;