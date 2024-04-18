import { useMemo } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

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
    const list = useMemo(() => ['All', 'Top', 'Jungle', 'Middle', 'Bottom', 'Support'], []);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const role = queryParams.get('role') || 'all';
    const navigate = useNavigate();
    
    const onClickLane = (title) => {
        // Change the 'role' query parameter in the URL
        queryParams.set('role', title.toLowerCase());
        // Navigate to the new URL with the updated query parameter
        navigate(`/champions?${queryParams.toString()}`);
    };
    console.log(role);
    return (
        <Wrapper>
            {list.map((data, index) => (
                
                <Role
                    selected={role === data.toLowerCase()}
                    key={index}
                    onClick={() => onClickLane(data)}
                >
                    {data}
                </Role>
            ))}
        </Wrapper>
    );
}

export default RoleNav;
