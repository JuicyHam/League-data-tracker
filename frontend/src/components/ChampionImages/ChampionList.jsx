import React, { useCallback } from 'react';
import { useAppData } from '../../contexts/AppDataContext';
import styled from 'styled-components';
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
    font-weight: 400;
    margin-top: 3px;
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
  const { championData,  championInfo } = useAppData();

  const getChampionRoles = useCallback((championId) => {
    const roles = [];

    Object.keys(championData).forEach(role => {
        if (championData[role][championId]) {
            roles.push(role.toLowerCase());
        }
    });

    return [...new Set(roles)];
}, [championData]);

  const filteredChampionIcons = Object.entries(championInfo).filter(
    ([championId, championInfo]) => {
      const championName = championInfo.name;
      const iconUrl = championInfo.image;

      if (selectedRole !== 'All') {
        const championRoles = getChampionRoles(championId);
        if (selectedRole.toLowerCase() === "support") {
          if (!championRoles.includes("utility")) return false;
        } else {
          if (!championRoles.includes(selectedRole.toLowerCase())) return false;
        }
        
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
        {filteredChampionIcons.map(([championId, championInfo]) => {
          const championName = championInfo.name;
          const iconUrl = championInfo.image;

          return (
            <ChampionWrapper key={championId}>
              <Link to={`/champion/${championName}`}>
                <ImageWrapper>
                  <img src={iconUrl} alt={championName} width="52px" />
                </ImageWrapper>
              </Link>
              <span>{championName}</span>
            </ChampionWrapper>
          );
        })}
      </ul>
    </Wrapper>
  );
};


export default ChampionIcons;
