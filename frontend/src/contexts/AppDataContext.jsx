import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState("EUW");
  const [championIcons, setChampionIcons] = useState([]);
  const [playerIcons, setPlayerIcons] = useState([]);

  
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

        console.log("Doing");
        // Fetch player icons
        const playerIconsResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/profileicon.json`);
        const playerIconsData = playerIconsResponse.data.data;
        const playerIconsById = Object.values(playerIconsData).reduce((acc, icon) => {
          acc[icon.id] = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${icon.id}.png`;
          return acc;
        }, {});
        setPlayerIcons(playerIconsById);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);

  const sendValues = {
    selectedRegion,
    setSelectedRegion,
    championIcons,
    playerIcons
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