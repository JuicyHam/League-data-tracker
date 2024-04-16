import { useCallback } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 0 10px;
    cursor: pointer;
    
    width: 100%;
    height: 40px;

    

    
`

const TagWrap = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.selected ? props.theme.default_font_color :  props.theme.region_border};
`

const ChampionBox = ({title, selected, onClick, width}) => {
    const onClickWrapper = useCallback(() => {
        if (typeof title === 'string' && onClick) {
            onClick(title);
        }
    }, [ onClick]);
    
    return (
        <Wrapper title={title} selected={selected} onClick={onClickWrapper} >
            <TagWrap selected={selected}>{title}</TagWrap>
        </Wrapper>
    )
};   

export default ChampionBox;