import { useContext, useMemo } from "react";
import styled from "styled-components";

import ChampionDropdown from "../ChampionDropdowns";
import rankList from "../../../../Json/rankList";
import versionList from "../../../../Json/versionList";
import { useCallback } from "react";
import regionList from "../../../../Json/regionList";
import { useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.nav`
    display: flex;
    align-items: center;
`

const DropdownWrapper = styled.div`
    position: relative;
    border: 1px solid #4f4f82;
    border-radius: 6px;
    width: ${props => props.width || '150px'};
    margin-right: 7px;
`


const ChampionOptions = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const rank = queryParams.get('rank') || 'all';
    const region = queryParams.get('region') || 'Global';
    const patch = queryParams.get('patch') || '14.8';
    const navigate = useNavigate();

    const fullRegionList = [{
        title: "Global",
    }, ...regionList];

    const onClickRank = useCallback((title) => {
        queryParams.set('rank', title);
        navigate(`?${queryParams.toString()}`);
    }, []);

    const onClickPatch = useCallback((title) => {
        queryParams.set('patch', title);
        navigate(`?${queryParams.toString()}`);
    }, []);

    const onClickRegion = useCallback((title) => {
        queryParams.set('region', title);
        navigate(`?${queryParams.toString()}`);
    }, []);

    const dropdownList = useMemo(() => [
        {
            current: region,
            list: fullRegionList,
            setState: onClickRegion,
            width: '100px'
        },
        {
            current: rank,
            list: rankList,
            setState: onClickRank
        },
        {
            current: patch,
            list: versionList,
            setState: onClickPatch
        }
        
    ], [rank, rankList, patch, versionList, region, regionList, onClickRank, onClickPatch, onClickRegion]);

    return (
        <Wrapper>
            {dropdownList.map((data, index) => {
                return(<DropdownWrapper key={index} width={data.width}>
                    <ChampionDropdown current={data.current} list={data.list} setState={data.setState} />
                </DropdownWrapper>);
            })}
        </Wrapper>
    );
}

export default ChampionOptions;