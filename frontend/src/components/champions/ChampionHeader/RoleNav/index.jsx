import { useContext, useMemo } from "react";
import styled from "styled-components";
import { ChampionContext } from "../../../../contexts/ChampionContext";
import { useCallback } from "react";

const Wrapper = styled.ul`
    display: flex;
    flex-direction: row;
`

const Role = styled.li`
    
    
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 104px;
    font-size: 14px;
    border: 1px solid #43435c;
    border-right-width: 0px;
    height: 40px;
    color: rgba(234, 240, 236, '0.6'});
    cursor: pointer;
    
    transition: color 0.3s ease, background-color 0.3s ease;
    ${props => props.selected && `
        background-color: #1a1a29;
        color: rgba(234, 240, 236, 1);
    `};
    &:hover {
        
        ${props => !props.selected && `
            color: rgba(234, 240, 236, 1);
            background-color: #202033;
        `}
        
    }

    &:first-of-type {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }

    &:last-of-type {
        border-right-width: 1px;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }
`


const RoleNav = () => {
    const list = useMemo(() => ['All', 'Top','Jungle','Mid','Bottom','Support'], []);
    const {lane, setLane} = useContext(ChampionContext);

    const onClickLane = useCallback((title) => {
        setLane(title);
    }, []);

    return (
    <Wrapper>
        {list.map((data, index) => {
            return (
                <Role
                $lane={data}
                selected={lane === data}
                key={index}
                onClick={() => onClickLane(data)}
                >
                    {data}
                </Role>
            )
        })
            
        }
    </Wrapper>
    );
}

export default RoleNav;