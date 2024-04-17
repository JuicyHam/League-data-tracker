import {useState, useEffect, useRef, useCallback, useContext} from "react";
import styled from "styled-components";
import SearchRegion from "./SearchRegion"
import PlaceHolder from "../PlaceHolderRegion";


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

const Searchbar = () => {
    const [summonerName, setSummonerName] = useState('');

    const [focus, setFocus] = useState(false);  
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    
    const onChangeFocusOn = useCallback(() => {
        setFocus(true)
    }, []);

    const onChangeFocusOut = useCallback((e) => {
        if (wrapperRef.current && !wrapperRef?.current?.contains(e.target)) {

            setFocus(false);
        }
    }, []);

    const onChangeSummoner = useCallback((e) => {
        setSummonerName(e.target.value)
    })

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
                </InputWrapper> 
            </SearchWrapper>
        </Wrapper>
    );
}

export default Searchbar;