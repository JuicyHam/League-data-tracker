import { useState, createContext, useContext } from "react";

export const ChampionContext = createContext();

export const ChampionProvider = ({children}) => {
    const [lane, setLane] = useState("All");

    const sendValues = {lane, setLane};

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

