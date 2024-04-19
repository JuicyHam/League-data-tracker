import { useCallback } from "react";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 10px 10px 0 10px;
`

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: #202033;
    height: 36px;
    width: 100%;
    border-radius: 6px;
    padding: 5px;
`

const InputWrapper = styled.div`
    width: 100%;
`

const SearchInput = styled.input`
    width: 100%;
    border: 0;
    background-color: transparent;
    font-size: 12px;
    color: white;
    caret-color: default;
`

const SearchIcon = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 22px;
        height: 22px;
    }
`

const ChampionSearchbar = ({setSearchQuery}) => {

    const onChangeChampion = useCallback((e) => {
        setSearchQuery(e.target.value)
    })

    return (
        <Wrapper>
            <SearchWrapper>
                <InputWrapper>
                    <SearchInput
                        autoComplete={"off"}
                        placeholder="Search a Champion"
                        onChange={onChangeChampion}
                        id={"search-input"}
                    />
                </InputWrapper>
                <SearchIcon>
                    <img src="Search_Icon.png" alt=''/>
                </SearchIcon>
            </SearchWrapper>
            
        </Wrapper>
    )
};

export default ChampionSearchbar;