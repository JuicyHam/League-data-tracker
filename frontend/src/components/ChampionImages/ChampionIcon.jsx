import React from 'react';
import styled from 'styled-components';
import { useAppData } from '../../contexts/AppDataContext';

const ChampionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.width || `32px`};
    height: ${props => props.height || `32px`};
    overflow: hidden;
    border-radius: 4px;
   
    img {
        width: 100%;
        height: 100%;
        transform: scale(1.15);
    }
`

const SingleChampion = ({ championName, width, height, championId }) => {
    const { championInfo } = useAppData();

    let championEntry;
    
    // If championId is provided, use it to directly access championInfo
    if (championId) {
        const championData = championInfo[championId];
        if (!championData) {
            
            // Handle case when champion data is not found
            return null;
        }
        championEntry = [championId, championData];
    } else {
        // Find the entry in championInfo where the value matches championName
        championEntry = Object.entries(championInfo).find(([_, championData]) => championData.name === championName);

        // If no matching champion data is found, return null
        if (!championEntry) {
            // Handle case when champion data is not found
            return null;
        }
    }

    // Extract the champion ID and champion data from the found entry
    const [foundChampionId, championData] = championEntry;
    // Extract the image URL from the champion data
    const championIcon = championData.image;

    return (
        <ChampionWrapper width={width} height={height}>
            <img src={championIcon} alt={championName} />
        </ChampionWrapper>
    );
};

export default SingleChampion;