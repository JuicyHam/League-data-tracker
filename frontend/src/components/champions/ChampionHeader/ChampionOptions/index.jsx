import { useContext, useMemo } from "react";
import styled from "styled-components";
import { ChampionContext } from "../../../../contexts/ChampionContext";
import ChampionDropdown from "../ChampionDropdowns";
import rankList from "../../../../Json/rankList";
import versionList from "../../../../Json/versionList";
import { useCallback } from "react";
import regionList from "../../../../Json/regionList";

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
    const {rank, setRank, patch, setPatch, rankRegion, setRankRegion} = useContext(ChampionContext);
    const fullRegionList = [{
        title: "Global",
    }, ...regionList];

    const onClickRank = useCallback((title) => {
        setRank(title);
    }, []);

    const onClickPatch = useCallback((title) => {
        setPatch(title);
    }, []);

    const onClickRegion = useCallback((title) => {

        setRankRegion(title);
    }, []);

    const dropdownList = useMemo(() => [
        {
            current: rankRegion,
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
        
    ], [rank, rankList, patch, versionList, rankRegion, regionList, onClickRank, onClickPatch, onClickRegion]);

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