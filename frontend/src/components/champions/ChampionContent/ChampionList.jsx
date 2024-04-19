import React, { useCallback } from 'react';
import { useAppData } from '../../../contexts/AppDataContext';
import styled from 'styled-components';
import { useChampionSearchData } from '../../../contexts/ChampionContext';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  ul {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    padding-left: 12px;
    gap: 8px;
  }
`;

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
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  overflow: hidden;
  border-radius: 6px;
`;

const ChampionIcons = ({ selectedRole, searchQuery }) => {
  const { championIcons } = useAppData();
  const { championData} = useChampionSearchData();

  const getChampionRoles = useCallback((championName) => {
    // Filter the champion data based on the championName
    console.log(championName);
    console.log(championData);
    const filteredChampionData = championData.filter(champion => champion.championName === championName);
    console.log(filteredChampionData);
  
    // Extract the roles from the filtered champion data
    const roles = filteredChampionData.map(champion => champion.role.toLowerCase());
  
    // Return the unique roles (remove duplicates)
    return [...new Set(roles)];
  }, [championData]);


  const filteredChampionIcons = Object.entries(championIcons).filter(
    ([championName]) => {
      if (selectedRole !== 'All') {
        const championRoles = getChampionRoles(championName);
        if (!championRoles.includes(selectedRole.toLowerCase())) return false;
      }

      if (searchQuery && !championName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    }
  );

  

  return (
    <Wrapper>
      <ul>
        {filteredChampionIcons.map(([championName, iconUrl]) => (
        
          <ChampionWrapper key={championName}>
            <Link to={`/champion/${championName}`}>
                <ImageWrapper>
                <img src={iconUrl} alt={championName} width="52px" />
                </ImageWrapper>
            </Link>
            <span>{championName}</span>
          </ChampionWrapper>
        ))}
      </ul>
    </Wrapper>
  );
};


export default ChampionIcons;
