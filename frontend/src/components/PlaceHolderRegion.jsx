import { useContext, useMemo } from "react";
import regionList from "../Json/regionList";
import styled from "styled-components";
import { RegionContext } from "../contexts/RegionContext";

const Wrapper = styled.div`
    border-radius: 5px;
    padding: 0 4px;
    background-color: ${props => props.theme.placeholder.background_color};
    margin-left: 4px;
`

const Span = styled.span`
    color: ${props => props.theme.placeholder.font_color};
    font-size: 14px;
`

const PlaceHolder = () => {
    const {selectedRegion} = useContext(RegionContext);
    const serverRegion = useMemo(() => {
        try {
            const result = regionList.find((data) => data.title === selectedRegion);
            return result.tagName
        } catch (e) {
            return 'NAN'
        }
    }, [selectedRegion])

    return (
        <Wrapper>
            <Span>
                #{serverRegion}
            </Span>
        </Wrapper>
    );
}

export default PlaceHolder