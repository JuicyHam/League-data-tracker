import { useState, createContext, useContext } from "react";

export const ChampionContext = createContext();

export const ChampionProvider = ({children}) => {
    const [championData, setChampionData] = useState([]);

    const sendValues = {championData, setChampionData};

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

