import React from 'react';
import styled from 'styled-components';
import { useAppData } from '../../../contexts/AppDataContext';

const ChampionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 4px;
    
`

const SingleChampion = ({ championName }) => {
    const { championIcons } = useAppData();

    const championIcon = championIcons[championName];

    return (
    <ChampionWrapper>
        <img src={championIcon} alt={championName} width="36px" />
    </ChampionWrapper>)
};

export default SingleChampion;