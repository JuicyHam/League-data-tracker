import styled from "styled-components";
import ChampionTableHeader from "./ChampionTableHeader";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";

import ChampionTableContent from "./ChampionTableHeader/RankingTableContent";
import { useLocation } from "react-router-dom";

import Loading from "../../../common/Loading";
import regionList from "../../../../Json/regionList";
import { useAppData } from "../../../../contexts/AppDataContext";
import ErrorMessage from "../../../common/Error";



const Wrapper = styled.main`
    width: 750px;
    background-color: #2e2e43;
    border-radius: 6px;
    height: 100%;
`
const RanksTable = styled.table`
    width: 100%;    
    border-collapse: collapse;
    table-layout: auto;
`

const TBody = styled.tbody`

  tr:nth-child(even) {
    background-color: #202033;;
  }
`;


const ChampionContentHeader = ({cumulativeCount, tableData, lane, region, rank}) => {
    
    return( Object.entries(tableData[lane]).map(([championId, championData], championIndex) => {
        cumulativeCount += 1;
        const total_games = tableData["total_games"]
        if (total_games) {
            const champGamesPlayed = championData["wins"] + championData["losses"];
            let totalGamesPlayed = 0;
            
            if (rank.toLowerCase() === "all") {
                const totalGamesData = tableData["total_games"][region.toLowerCase()];
                if (totalGamesData) {
                    Object.values(totalGamesData).forEach(stats => {
                        totalGamesPlayed += stats
                    });
                }
            } else {
                totalGamesPlayed = tableData["total_games"][region.toLowerCase()][rank.toLowerCase()];
            }


            
            const opponentArray = Object.entries(championData['opponents']).map(([opponentId, opponentData]) => {
                const { wins, losses } = opponentData;
                const winRatio = wins / (wins + losses);
                return { id: opponentId, winRatio };
            });
            // Sort the opponent array based on win ratio in descending order
            opponentArray.sort((a, b) => b.winRatio - a.winRatio);
                    
            // Select the top three opponents
            const topThreeOpponents = opponentArray.slice(0, 3).map(opponent => ({
                id: opponent.id,
                winRatio: opponent.winRatio
            }));

            return (
                <ChampionTableContent
                    key={`${lane}_${championId}`}
                    lane={lane}
                    championId={championId}
                    winRate={Number((championData["wins"] / champGamesPlayed) * 100).toFixed(1)}
                    pickRate={Number((champGamesPlayed / totalGamesPlayed) * 100).toFixed(1)}
                    banRate={Number(championData["banned"] / totalGamesPlayed * 100).toFixed(1)}
                    counter={topThreeOpponents}
                    tier={1}
                    rank={cumulativeCount} // Set rank as the cumulative count
                />
            );
        }
        
        
    }));
}

const ChampionTableEntries = ({ tableData, region, rank, lane }) => {

    let totalCount = 0;
    let cumulativeCount = 0;
    console.log(cumulativeCount);
    if (!(tableData.length === 0)) {
    
        if (lane === "all") {
            Object.keys(tableData).forEach(role => {
                // Exclude the "total_games" lane
                    if (role !== "total_games") {
                        Object.values(tableData[role]).forEach(championData => {
                            totalCount += championData["wins"] + championData["losses"];
                        });
                    }
            });
            return (
                <>
                    {Object.keys(tableData).map((lane, laneIndex) => {
                        // Exclude the "total_games" lane
                        if (lane !== "total_games") {
                            
                            const championHead = (<ChampionContentHeader cumulativeCount={cumulativeCount} tableData={tableData} lane={lane} region={region} rank={rank} />);
                            cumulativeCount += Object.keys(tableData[lane]).length;
                            return(championHead);
                            
                        }
                        return null; // Return null for the "total_games" lane
                    })}
                </>
            );
        } else if (tableData[lane]) {
            Object.values(tableData[lane]).forEach(championData => {
                totalCount += championData["wins"] + championData["losses"];
            });
        
                    
            if (lane !== "total_games") {
                    return (<ChampionContentHeader cumulativeCount={0} tableData={tableData} lane={lane} region={region} rank={rank} />);
            }
            return null; // Return null for the "total_games" lane
                    
                
        }
    }
    
};

const Ranking = () => {
    const {championData, setChampionData} = useAppData();
    const { search } = useLocation();
    const [loading, setLoading] = useState(true);
    const queryParams = new URLSearchParams(search);

    const rawLane = queryParams.get('role') || 'all';
    const lane = rawLane === "support" ? "utility" : rawLane;
    const rank = queryParams.get('rank') || 'all';
    const regionParamValue = queryParams.get('region') || 'global';
    const regionItem = regionList.find(regionItem => regionItem.title === regionParamValue);
    const region = regionItem?.serverName || "global";

    const prevRegion = useRef(region);
    const prevRank = useRef(rank);
    const [sortBy, setSortBy] = useState({ key: '', order: 'asc' });

    // Sorting callback
    const handleSort = (key) => {
        setSortBy((prevSortBy) => ({
        key,
        order: prevSortBy.key === key && prevSortBy.order === 'asc' ? 'desc' : 'asc',
        }));
    };


    useEffect(() => {
        if (region !== prevRegion.current || rank !== prevRank.current || championData.length === 0) { 
            prevRegion.current = region; 
            prevRank.current = rank
            if (region) { 
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`/api/champions`, {
                            params : {
                                region: region,
                                rank: rank
                            }
                        });
                        if (response.status !== 200) {
                            throw new Error('Failed to fetch champion data');
                        }
                        setChampionData(response.data);
                        
                    } catch (error) {
                        console.log("Error fetching champion data: ", error);
                    }
                };
                fetchData();
            }
        }
        setLoading(false)
    }, [region, rank]);

    if (loading) {
        return <Wrapper><Loading  height={"700px"} /></Wrapper>
    }

    console.log(rank.toLowerCase());
    console.log(lane.toLowerCase());
    if (!championData) {
        return (
        <Wrapper>
            <ErrorMessage errorMessage={"No data"} />
        </Wrapper>);
    }
    return (
            
        <Wrapper>
            <RanksTable>
                <colgroup>
                    <col width="48" />
                    <col width="*" />
                    <col width="56" />
                    <col width="56" />
                    <col width="94" />
                    <col width="110" />
                    <col width="94" />
                    <col width="135" />
                        
                </colgroup>
            
                <thead>
                    <ChampionTableHeader onSort={handleSort}/>
                </thead>
                <TBody>

                    
                    {championData && <ChampionTableEntries tableData={championData} lane={lane} region={region} rank={rank} />}
                     

                </TBody>
            </RanksTable>
        </Wrapper>
    )
}

export default Ranking;