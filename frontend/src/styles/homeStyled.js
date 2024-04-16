import styled from "styled-components";

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    padding: 0 0 5rem 0;
    .home {
        width: 1162px;
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5rem 0 0;
        h2 {
            img {
                width: 500px;
            }
        }
    }
`