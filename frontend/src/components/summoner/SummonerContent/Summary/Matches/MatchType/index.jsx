import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useSummonerData } from "../../../../../../contexts/summonerData";
import queueData from '../../../../../../Json/queueIds';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 45px;
    background-color: #2e2e43;
    height: 42px;
    padding: 5px;
    border-radius: 6px;
`

const QueueOption = styled.button`
    display: flex;
    align-items: center;
    padding: 7px 10px;
    font-size: 12px;
    cursor: pointer;
    margin-right: 6px;
    background-color: ${props => props.selected ? `rgb(26, 26, 41)` : `Transparent`};
    border-radius: 6px;
    font-weight: 400;
    color: rgb(234, 240, 236);
    opacity: ${props => props.selected ? `1` : `0.6`};
    transition: background-color 0.3s ease;
    &:hover {
        background-color: rgb(26, 26, 41);
        opacity: 1;
    }
`

const MatchType = () => {
    const { summonerData } = useSummonerData();
    const { matches } = summonerData;
    const [ queueCounts, setQueueCounts ] = useState({});
    const [queue, setQueue] = useState("Total");

    useEffect(() => {
        // Calculate queue counts whenever summonerData changes
        if (matches) {
            const queueCountsMap = matches.reduce((acc, match) => {
                const queueId = match.queueId;
                const queueName = queueData.find(queue => queue.queueId === queueId)?.name || `Normal`;
                acc[queueName] = (acc[queueName] || 0) + 1;
                acc["Total"] = (acc["Total"] || 0) + 1;
                return acc;
            }, {});
            // Sort queue counts by biggest first
            const sortedQueueCounts = Object.entries(queueCountsMap)
                .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
                .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}); // Convert back to object

            setQueueCounts(sortedQueueCounts);
        }
    }, [summonerData]);

    return (
        <Wrapper>
            {/* Render options for each game mode with counts */}
            {Object.entries(queueCounts).map(([queueName, count]) => (
                <QueueOption key={queueName} selected={queueName===queue}>
                    {queueName} x{count} 
                </QueueOption>
            ))}
        </Wrapper>
    );
};

export default MatchType;
