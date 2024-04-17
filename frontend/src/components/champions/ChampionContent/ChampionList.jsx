import React from 'react';
import { useAppData } from '../../../contexts/AppDataContext';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;

    ul {
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
        padding-left: 12px;
        gap: 8px;
    }
`

const ChampionWrapper = styled.li`
    width: 46px;   
    
    span {
        display: block;
        width: 100%;
        font-size: 11px;
        width: 100%;
        font-weight: 100;
        margin-top: 2px;
        height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`


const ChampionIcons = () => {
  const { championIcons } = useAppData();

  return (
    <Wrapper>   
        <ul>
            {Object.keys(championIcons).map(championName => (
                <ChampionWrapper key={championName}>
                    <img src={championIcons[championName]} alt={championName} width="46px" />
                    <span>{championName}</span>
                </ChampionWrapper>
            ))}
        </ul>
        
       
    </Wrapper>
  );
};

export default ChampionIcons;