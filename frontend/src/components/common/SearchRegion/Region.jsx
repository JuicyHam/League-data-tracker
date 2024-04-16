import { useCallback } from "react";
import styled from "styled-components";
import { regionColor } from "../../../functions";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${props => props.$isDisabled ? "auto" : "pointer"};
    border: 1px solid ${props => {
        let color = props.theme.region_border;
        if (props.selected) color = 'transparent';
        return color;
    }};
    background-color: ${props => {
        let color = 'transparent';
        if (props.selected) color = regionColor(props.title);
        return color;
    }};
    border-radius: ${props => props.radius || '6px'};
    width: ${props => props.width || '48px'};
    height: ${props => props.height || '28px'};
    opacity: ${props => props.$isDisabled ? "0.5" : "1"};
    
`

const TagWrap = styled.div`
    font-size: ${props => props.fontSize ||     '12px'};
    font-weight: 500;
    color: ${props => {
        let color = props.theme.region_border
        if (props.selected) color = props.theme.default_font_color;
        return color
    }};;
`

const RegionBox = ({title, isDisabled, selected, onClick, width, height, radius, fontSize}) => {
    const onClickWrapper = useCallback(() => {
        if (!isDisabled && typeof title === 'string' && onClick) {
            onClick(title);
        }
    }, [isDisabled, onClick]);
    
    return (
        <Wrapper title={title} $isDisabled={isDisabled} selected={selected} onClick={onClickWrapper} width={width} height={height} radius={radius}>
            <TagWrap selected={selected} fontSize={fontSize}>{title}</TagWrap>
        </Wrapper>
    )
};   

export default RegionBox;