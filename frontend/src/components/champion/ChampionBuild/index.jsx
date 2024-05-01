import styled from "styled-components";
import RuneSort from "./RuneSort";
import RuneBuild from "./RunesBuild";
import { useCallback, useEffect, useState } from "react";

const Wrapper = styled.div`
    display: flex;

    width: 100%;
    margin-top: 10px;
`

const ChampionBuild = ({ championData }) => {
    const [selectedRune, setSelectedRune] = useState(null);
    const [userSelectedRune, setUserSelectedRune] = useState(null); // Track user-selected rune

    // Function to filter runes based on some criteria, e.g., highest win rate
    const filterRunes = useCallback(() => {
        // Logic to filter runes based on championData
        // For example, filter runes with wins greater than a certain threshold#
        let TotalGames = 0;
        const filteredRunes = Object.entries(championData.runes).filter(([rune, stats]) => {
            // Customize the filtering logic according to your requirements
            TotalGames += stats.wins;
            TotalGames += stats.losses;
            return true;
        });
        filteredRunes["totalGames"] = TotalGames

        return filteredRunes;
    }, [championData]);

    // Call filterRunes to get the filtered rune data
    const filteredRunes = filterRunes();

    

    const handleSelectedRuneChange = (runeId) => {
        setUserSelectedRune(runeId); // Set user-selected rune
        setSelectedRune(runeId); // Set selected rune
    };

    return (
        <Wrapper>
            <RuneSort filteredRunes={filteredRunes} setSelectedRune={handleSelectedRuneChange} championData={championData} selectedRune={selectedRune} />
            {selectedRune && <RuneBuild selectedRune={selectedRune} championData={championData} />}
        </Wrapper>
    );
};

export default ChampionBuild;
