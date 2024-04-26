import styled from "styled-components";
import SearchRegion from "../SearchRegion";
import { AbsoluteTitle, AbsoluteWrapper, Champion, ChampionContent, ChampionWrapper, InputBox, InputWrapper, SearchIcon,  } from "../searchbar";
import SingleChampion from "../../ChampionImages/ChampionIcon";
import { useAppData } from "../../../contexts/AppDataContext";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useCallback } from "react";
import axios from "axios";
import regionList from "../../../Json/regionList";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 48px;
    padding: 8px 0;
    align-items: center;
`
const Image = styled.img`
    width: 140px;
`

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 15px;
    background-color: white;
    border-radius: 3px;
    width: 100%;
    height: 100%;
    align-items: center;
`

const RegionWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 7px;
    height: 100%;
`

const SearchInput = styled.input`
    width: 100%;
    border: 0;
    background-color: transparent;
    font-size: 14px;
    color: Black;
`

const HeaderSearch = () => {
    const { selectedRegion, championInfo, playerIcons} = useAppData();
    const navigate = useNavigate();
    const [summonerName, setSummonerName] = useState(``);
    const [focus, setFocus] = useState(false);
    const [receivedNames, setReceivedNames] = useState([]);
    const debounceTimeout = useRef(null); // Ref to store debounce timeout ID
    

    const onChangeFocusOn = useCallback(() => {
        setFocus(true)
    }, []);

    const onChangeFocusOut = useCallback((e) => {
        if (wrapperRef.current && !wrapperRef?.current?.contains(e.target)) {

            setFocus(false);
        }
    }, []);
    
    const performSearch = useCallback(() => {
        if (summonerName.length >= 3) {
            const modifiedValue = summonerName.replace('#', '-'); // Replace '#' with '-'
            navigate(`/summoner/${selectedRegion}/${modifiedValue}`);
        }
    }, [summonerName]);

    const onKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            // Trigger search when Enter key is pressed
            performSearch();
        }
    }, [performSearch]);

    


    const onChangeSummoner = useCallback((e) => {
        console.log("Tick");
        const value = e.target.value;
        setSummonerName(value)
        const modifiedValue = value.replace('#', '-'); // Replace '#' with '-'
        // Clear previous debounce timeout
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        
        if (value.length >= 3) {
            console.log("ock");
            debounceTimeout.current = setTimeout(async () => {
                try {

                    const regionObject = regionList.find((item) => item.title.toLowerCase() === selectedRegion.toLowerCase());
                    console.log(selectedRegion);
                    if (!regionObject) {
                        console.log("not getting data rn");
                        throw new Error("Region not found in regionList");
                    }
                    const tagName = regionObject.serverName;
                    // Make request to server
                    const response = await axios.get(`/api/summoner/getnames/${selectedRegion}/${tagName}/${modifiedValue}`);

                    setReceivedNames(response.data);
                    console.log("Done");
                    console.log(response.data);

                } catch (error) {
                    console.error('Error fetching summoner data:', error);
                }
            }, 500); // Adjust debounce delay here (in milliseconds)
        } else {
            setReceivedNames([]);
            console.log('Summoner name must be longer than 3 characters to make a request.');
        }
    }, []);

    const filteredChampions = useMemo(() => {
        if (summonerName.length < 1) {
            return null; // Return null if summonerName is empty
        }
    
        const filteredEntries = Object.entries(championInfo).filter(([_, championData]) =>
            championData.name.toLowerCase().includes(summonerName.toLowerCase())
        );
    
        return filteredEntries.length > 0 ? filteredEntries : null; // Return null if no names were found
    }, [championInfo, summonerName]);





    return (
    <Wrapper>
        <Image src="/Logo.png"/>
        <SearchWrapper>
            <RegionWrapper>
                <SearchRegion width={"34px"} height={"20px"} radius={"3px"} fontSize={"10px"} />
            </RegionWrapper>
            <InputWrapper >
                <InputBox>
                    <SearchInput
                        autoComplete={"off"}
                        onChange={onChangeSummoner}
                        onKeyDown={onKeyPress}
                        onFocus={onChangeFocusOn}
                        id={"search-input"}
                    />
                </InputBox>
                <SearchIcon>
                    <img src="/Search_Icon.png" alt=''/>
                </SearchIcon>
                {focus && <AbsoluteWrapper>
                    {filteredChampions && <ChampionWrapper>
                        <AbsoluteTitle>
                            Champions
                        </AbsoluteTitle>
                        <ChampionContent>
                            <div className="SearchBox">
                                {filteredChampions.map(([championId, championData]) => (
                                    <Champion key={championId}>
                                        <SingleChampion championId={championId}/>
                                        <span>{championData.name}</span>
                                    </Champion>
                                ))}
                            </div>
                        </ChampionContent>
                    </ChampionWrapper>}
                    {receivedNames && receivedNames.length > 0 && (
                        <ChampionWrapper>
                            <AbsoluteTitle>Summoners</AbsoluteTitle>
                            <ChampionContent>
                            <div className="SearchBox">
                                {receivedNames.map((championData, index) => (
                                <Champion key={index} to={`/summoner/${selectedRegion}/${championData.summoner_name}-${championData.tag_line}`}>
                                    <img className="profile" src={playerIcons[championData.profile_icon]} />
                                    <span>{championData.summoner_name}#{championData.tag_line}</span>
                                </Champion>
                                ))}
                            </div>
                            </ChampionContent>
                        </ChampionWrapper>
                        )}
                </AbsoluteWrapper>}
            </InputWrapper> 
            
        </SearchWrapper>
    </Wrapper>);
};

export default HeaderSearch