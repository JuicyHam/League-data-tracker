import React from 'react';
import { useAppData } from '../../../contexts/AppDataContext';
import styled from 'styled-components';

const Wrapper = styled.div`
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
        color: rgba(234, 240, 236, 0.6);
    }
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 46px;
    overflow: hidden;
    border-radius: 6px;
`


const ChampionIcons = () => {
  const { championIcons } = useAppData();

  return (
    <Wrapper>   
        <ul>
            {Object.keys(championIcons).map(championName => (
                <ChampionWrapper key={championName}>
                    <ImageWrapper>
                        <img src={championIcons[championName]} alt={championName} width="52px" />
                    </ImageWrapper>
                    
                    <span>{championName}</span>
                </ChampionWrapper>
            ))}
        </ul>
        
       
    </Wrapper>
  );
};

export default ChampionIcons;