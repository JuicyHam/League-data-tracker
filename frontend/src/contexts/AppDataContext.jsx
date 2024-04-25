import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState("EUW");
  const [championInfo, setChampionInfo] = useState([]);
  const [playerIcons, setPlayerIcons] = useState([]);
  const [itemIcons, setItemIcons] = useState([]);
  const [summonerSpellsIcon, setSummonerSpellsIcon] = useState([]);
  const [runesIcon, setRunesIcon] = useState([]);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const versionResponse = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
        const latestVersion = versionResponse.data[0];
        const championResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
        const championData = championResponse.data.data;
        const championInfoById = Object.values(championData).reduce((acc, champion) => {
          acc[champion.key] = {
            name: champion.name,
            image: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`
          };
          return acc;
        }, {});
        setChampionInfo(championInfoById);
        // Fetch player icons
        const playerIconsResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/profileicon.json`);
        const playerIconsData = playerIconsResponse.data.data;
        const playerIconsById = Object.values(playerIconsData).reduce((acc, icon) => {
          acc[icon.id] = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/profileicon/${icon.id}.png`;
          return acc;
        }, {});
        setPlayerIcons(playerIconsById);

        // Fetch item icons
        const itemResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`);
        const itemData = itemResponse.data.data;
        const itemIconsById = Object.keys(itemData).reduce((acc, itemId) => {
          
          const item = itemData[itemId];
          const { image } = item;
          if (image && image.full) {
            acc[itemId] = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${image.full}`;
          }
          return acc;
        }, {});
        setItemIcons(itemIconsById);

        const summonerSpellResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/summoner.json`);
        const summonerSpellData = summonerSpellResponse.data.data;
        const summonerSpellIconsById = {};

        Object.entries(summonerSpellData).forEach(([spellId, spell]) => {
          const { image } = spell;
          if (image && image.full) {
            summonerSpellIconsById[spell.key] = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${image.full}`;
          }
        });
        setSummonerSpellsIcon(summonerSpellIconsById);

        const runeResponse = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/runesReforged.json`);
        const runeData = runeResponse.data;
        const runesIconById = {};
        runeData.forEach(tree => {
          tree.slots.forEach(slot => {
            slot.runes.forEach(rune => {
              runesIconById[rune.id] = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
            });
          });
          runesIconById[tree.id] = `https://ddragon.leagueoflegends.com/cdn/img/${tree.icon}`;
        });
        setRunesIcon(runesIconById);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);

  const sendValues = {
    selectedRegion,
    setSelectedRegion,
    championInfo,
    playerIcons,
    itemIcons,
    summonerSpellsIcon,
    runesIcon
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