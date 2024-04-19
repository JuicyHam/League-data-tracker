import styled from "styled-components";
import Dropdown from "../../../Dropdown"

import { useCallback, useContext} from "react"
import { ChampionContext } from "../../../../contexts/ChampionContext";
import RegionBox from "../../../common/SearchRegion/Region";
import ChampionBox from "./ChampionBox";

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-right: 10px;
`
const WrapperAbsolute =  styled.div`
    position: absolute;
    top: 130%;
    width: 100%;
    left: 0px;
    border: 1px solid ${props => props.theme.region_border};
    background: ${props => props.theme.input_background};
    border-radius: 6px;
`

const GroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const GroupTitle = styled.div`
    color: ${props => props.theme.default_font_color};
    font-size: 11px;
    margin: 7px 0px 7px 11px;
`

const GroupContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-flow: wrap;
    width: 100%;
    
    .dropdown-object {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #43435c;
        transition: color 0.3s ease, background-color 0.3s ease;
        color: rgba(234, 240, 236, 0.6);
        &:hover {
            color: rgba(234, 240, 236, 1);
            background-color: #202033;
        }
        &:first-of-type {
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
        }
        &:last-of-type {
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            border: none;
        }
    } 
`

const Arrow = styled.div`
    width: 0px;
    height: 0px;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: #6b78b5;
    border-bottom-color: transparent;
    border-width: 5px;
    margin-left: 10px;
    margin-top: 5px;
    border-style: solid;
`


const ChampionDropdown = ({current, list, setState}) => {

   
    return (
        <Dropdown>
            <Dropdown.Button>
                <ButtonWrapper>
                    <ChampionBox title={current} selected={true} />
                    <Arrow/>
                </ButtonWrapper>
            </Dropdown.Button>
            <Dropdown.Group>
                <WrapperAbsolute>
                    <GroupWrapper>
                        <GroupContent>
                            {list.map((data) => {
                                return (
                                    <Dropdown.DropdownObject key={data.title}>
                                        <ChampionBox title={data.title} selected={current === data.title} onClick={setState} />
                                    </Dropdown.DropdownObject>
                                )
                            })}
                        </GroupContent>
                    </GroupWrapper>
                </WrapperAbsolute>
            </Dropdown.Group>
        </Dropdown>
    );
}

export default ChampionDropdown