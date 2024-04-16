import styled from "styled-components";
import Dropdown from "../../Dropdown"
import regionList from "../../../Json/regionList";
import RegionBox from "./Region";
import {memo, useCallback, useContext} from "react"
import { RegionContext } from "../../../contexts/RegionContext";

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`
const WrapperAbsolute =  styled.div`
    padding: 7px;
    position: absolute;
    top: 130%;
    width: 202px;
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
    flex-direction: row;
    flex-flow: wrap;

    .dropdown-object {
        margin: 6px 7px;
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



const SearchRegion = ({ width, height, radius, fontSize}) => {

    const {selectedRegion,setSelectedRegion} = useContext(RegionContext);

    const onClickRegion = useCallback((title) => {
        setSelectedRegion(title);
    }, []);


    return (
        <Dropdown>
            <Dropdown.Button>
                <ButtonWrapper>
                    <RegionBox title={selectedRegion} isDisabled={false} selected={true} width={width} height={height} radius={radius} fontSize={fontSize} />
                    <Arrow/>
                </ButtonWrapper>
            </Dropdown.Button>
            <Dropdown.Group>
                <WrapperAbsolute>
                    <GroupWrapper>
                        <GroupTitle>
                            Region
                        </GroupTitle>
                        <GroupContent>
                            {regionList.map((data) => {
                                return (
                                    <Dropdown.DropdownObject key={data.title}>
                                        <RegionBox title={data.title} isDisabled={data.disabled} selected={selectedRegion === data.title} onClick={onClickRegion} />
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

export default SearchRegion