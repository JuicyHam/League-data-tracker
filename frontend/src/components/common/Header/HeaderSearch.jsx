import styled from "styled-components";
import SearchRegion from "../SearchRegion";
import React, { useState, useCallback} from "react";

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

const HeaderSearch = () => {


    return (
    <Wrapper>
        <Image src="Logo.png"/>
        <SearchWrapper>
            <RegionWrapper>
                <SearchRegion width={"34px"} height={"20px"} radius={"3px"} fontSize={"10px"} />
            </RegionWrapper>
            
        </SearchWrapper>
    </Wrapper>);
};

export default HeaderSearch