import React from 'react';
import styled from 'styled-components';
import { useAppData } from '../../../contexts/AppDataContext';

const ChampionWrapper = styled.div`
    width: 32px;   
    
`

const SingleChampion = ({ championName }) => {
    const { championIcons } = useAppData();

    const championIcon = championIcons[championName];

    return (<ChampionWrapper>
        <img src={championIcon} alt={championName} width="32px" />
    </ChampionWrapper>)
};

export default SingleChampion;