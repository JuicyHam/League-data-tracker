import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState("EUW");
  const [championIcons, setChampionIcons] = useState([]);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const versionResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const latestVersion = versionResponse.data[0];
        const championResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
        const championData = championResponse.data.data;
        const championIconsByName = Object.values(championData).reduce((acc, champion) => {
          acc[champion.name] = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`;
          return acc;
        }, {});
        setChampionIcons(championIconsByName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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