import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    
`

export const HeadRow = styled.tr`
    font-size: 12px;
    font-weight: 600;

    th {
        background-color: rgb(26, 26, 41);
        padding: 6px 0;
        &:first-child {
            border-top-left-radius: 6px;
            
        }
        &:last-child {
            border-top-right-radius: 6px;
        }
    }
`;
export const Tbody = styled.tbody`
    
    tr {
        &:nth-child(2n) {
            background-color: rgb(34, 34, 54);
        }

        td {
            vertical-align: middle;
        }
    }
`

export const ItemTab = styled.td`
    padding-left: 20px;
`

export const ItemImages = styled.div`
    display: flex;
    padding: 12px 0;
    align-items: center;
    div {
        
    }
`
export const Arrow = styled.div`
    display: flex;
    border-right-color: transparent;
    border-top-color: transparent;
    border-left-color: #6b78b5;
    border-bottom-color: transparent;
    border-width: 8px;
    margin-left: 8px;
    border-style: solid;
    height: ${props => props.height};
`
export const PickRateTab = styled.td`
    text-align: center;
    p {
        font-size: 12px;
        font-weight: 500;
    }

    span {
        margin-top: 5px;
        font-size: 10px;
        font-weight: 300;
        opacity: 0.7;
    }
`

export const WinRateTab = styled.td`
    text-align: center;
    p {
        font-size: 12px;
        font-weight: 500;
        
    }
`