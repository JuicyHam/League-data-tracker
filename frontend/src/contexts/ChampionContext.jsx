import { useState, createContext, useContext } from "react";

export const ChampionContext = createContext();

export const ChampionProvider = ({children}) => {
    const [lane, setLane] = useState("All");
    const [rankRegion, setRankRegion] = useState("EUW");
    const [rank, setRank] = useState("Emerald");
    const [patch, setPatch] = useState("14.7");

    const sendValues = {lane, setLane, rankRegion, setRankRegion, patch, setPatch, rank, setRank};

    return (
        <ChampionContext.Provider value={sendValues}>
            {children}
        </ChampionContext.Provider>
    );
};

export const useChampionSearchData = () => {
    const championSearchData = useContext(ChampionContext);
    return championSearchData;
  };

