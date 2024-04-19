import styled from "styled-components";
import RoleIcon from "../../RoleIcon";
import { useCallback, useMemo } from "react";

const Wrapper = styled.nav`
    display: flex;
    flex-direction: row;
    
    padding: 8px;
    border-bottom: 1px solid ${props => props.theme.default_background_color};
`

const RoleWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    flex-basis: 16.67%;
    border: 1px solid #43435c;
    border-right: none;
    cursor: pointer;
    background-color: ${props => props.selected ? "#1a1a29" : "Transparent"};
    
    &:first-of-type {
        border-radius: 6px 0 0 6px;
    }

    &:last-of-type {
        border-radius: 0 6px 6px 0;
        border-right: 1px solid #43435c;
    }

    &:hover {
        transition: background-color 0.3s ease;
        ${props => !props.selected && `
            background-color: #202033;
        `}
    }

`

const RoleIconsOptions = ({selectedRole, setSelectedRole}) => {
    const list = useMemo(() => ['All', 'Top', 'Jungle', 'Middle', 'Bottom', 'Support'], []);

    const onClickRole = useCallback((newRole) => {
        setSelectedRole(newRole);
    },[setSelectedRole]);

    return (
        <Wrapper>
            {list.map((data, index) => (
                <RoleWrapper key={index} onClick={() => onClickRole(data)} selected={data === selectedRole}>
                    <RoleIcon role={data.toLowerCase()} width="28px" />
                </RoleWrapper>
            ))}
            
        </Wrapper>
    );
};

export default RoleIconsOptions;