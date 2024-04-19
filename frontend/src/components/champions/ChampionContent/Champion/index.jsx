import styled from "styled-components";
import ChampionIcons from "../ChampionList";
import RoleIconsOptions from "./RoleIconsOptions";
import ChampionSearchbar from "./ChampionSearchBar";
import { useState } from "react";

const Wrapper = styled.div`
    width: 340px;
    background-color: #2e2e43;
    border-radius: 6px;
    margin-right: 10px;
    height: 100%;
`

const Champion = () => {
    const [selectedRole, setSelectedRole] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <Wrapper>
        <ChampionSearchbar setSearchQuery={setSearchQuery} />
        <RoleIconsOptions selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
        <ChampionIcons selectedRole={selectedRole} searchQuery={searchQuery} />
      </Wrapper>
    );
  };
  
export default Champion;
