import React from 'react';
import styled from 'styled-components';

const ChampionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;  
    
`

const RoleIcon = ({ role, width }) => {
    return (<ChampionWrapper>
        <img src={`/Roles/${role}.png`} alt={role} width={width || `28px`} />
    </ChampionWrapper>)
};

export default RoleIcon;