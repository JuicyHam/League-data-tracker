import { createContext, useContext, useState, useEffect } from "react";

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState("EUW");
  const [championIcons, setChampionIcons] = useState([]);

  
  useEffect(() => {
    async function fetchData() {
      const versionResponse = await fetch('http://ddragon.leagueoflegends.com/api/versions.json');
      const versionData = await versionResponse.json();
      const latestVersion = versionData[0]; 
      const championResponse = await fetch(`http://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
      const championData = await championResponse.json();
      const championIconsByName = Object.values(championData.data).reduce((acc, champion) => {
        acc[champion.name] = `http://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`;
        return acc;
      }, {});
      setChampionIcons(championIconsByName);
    }
  
    fetchData();
  }, []);

  const sendValues = {
    selectedRegion,
    setSelectedRegion,
    championIcons
  };

  return (
    <AppDataContext.Provider value={sendValues}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const appData = useContext(AppDataContext);
  return appData;
};