import {useState, useEffect, useRef, useCallback, useMemo} from "react";
import styled from "styled-components";
import SearchRegion from "./SearchRegion"
import PlaceHolder from "../PlaceHolderRegion";
import { useAppData } from "../../contexts/AppDataContext";
import SingleChampion from "../ChampionImages/ChampionIcon";
import axios from "axios";
import regionList from "../../Json/regionList";


const Wrapper = styled.div`
    width: 720px;
    margin: 100px 0;
`

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    box-shadow: 0px 0px 6px #004CFF4D;
    border-radius: 26px;
    padding: 10px 20px;
    background-color: ${props => props.theme.input_background};
`

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 20px;
`

const InputBox = styled.div`
    position: relative;
    width: 100%;   
`

const SearchInput = styled.input`
    width: 100%;
    border: 0;
    background-color: transparent;
    font-size: 14px;
    color: white;
`

const SearchPlaceholder = styled.label`
    position: absolute;
    cursor: inherit;
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 16px;
    font-size: 15px;
    color: #AAAAAA;
`

const SearchIcon = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;    
    img {
        width: 28px;
        height: 28px;
    }
`

const AbsoluteWrapper = styled.div`
    position: absolute;
    width: 500px;
    
    top: 50px;
    border-radius: 6px;
`

const ChampionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
`

const AbsoluteTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(26, 26, 41);
    border: 1px solid ${props => props.theme.input_background};
    border-bottom: none;
    padding: 15px;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
`

const ChampionContent = styled.div`
    background-color: ${props => props.theme.input_background};
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    padding: 15px;
    .SearchBox {
        max-height: 200px;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 10px; /* width of the scrollbar */
        }
        &::-webkit-scrollbar-thumb {
            background-color: #353a5b; /* Color of the thumb */
            border-radius: 5px; /* Border radius of the thumb */
        }
        &::-webkit-scrollbar-track {
            border-radius: 5px;
            background-color: #1a1a29; /* Color of the track */
        }
    }
    
`

const Champion = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;

    span {
        margin-left: 12px;
    }
    
    div {
        border-radius: 6px;
    }
    
    .profile {
        width: 32px;
        height: 32px;
        border-radius: 6px;
    }

    
    margin-bottom: 6px;
    
`

const Searchbar = () => {
    const { selectedRegion, championInfo } = useAppData();
    
    const [summonerName, setSummonerName] = useState('');
    const [focus, setFocus] = useState(false);
    const [receivedNames, setReceivedNames] = useState([]);
    const {playerIcons} = useAppData();

    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const debounceTimeout = useRef(null); // Ref to store debounce timeout ID
    
    const onChangeFocusOn = useCallback(() => {
        setFocus(true)
    }, []);

    const onChangeFocusOut = useCallback((e) => {
        if (wrapperRef.current && !wrapperRef?.current?.contains(e.target)) {

            setFocus(false);
        }
    }, []);

    const onChangeSummoner = useCallback((e) => {
        const value = e.target.value;
        setSummonerName(value)
        const modifiedValue = value.replace('#', '-'); // Replace '#' with '-'
        // Clear previous debounce timeout
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        
        if (value.length > 3) {
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


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            document.addEventListener("mousedown", onChangeFocusOut, true)
            return () => {
                document.removeEventListener("mousedown", onChangeFocusOut, true)
            }
        }
    }, []);

    return (
        <Wrapper>
            <SearchWrapper>
                <SearchRegion />
                <InputWrapper ref={wrapperRef}>
                    <InputBox>
                        {(!focus && summonerName < 1) && <SearchPlaceholder htmlFor={"search-input"}>
                            Summoner Name +
                            <PlaceHolder backgroundColor={"Black"}/>
                        </SearchPlaceholder>}
                        <SearchInput
                            autoComplete={"off"}
                            onChange={onChangeSummoner}
                            ref={inputRef}
                            onFocus={onChangeFocusOn}
                            id={"search-input"}
                        />
                    </InputBox>
                    <SearchIcon>
                        <img src="Search_Icon.png" alt=''/>
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
                                    <Champion key={index}>
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
        </Wrapper>
    );
}

export default Searchbar;