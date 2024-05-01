import styled from "styled-components";
import { animated, useSpring } from 'react-spring';

const Wrapper = styled.div`
    min-height: ${props => props.height || `100vh`};
    display: flex;
    flex-direction: column;
    padding-top: 200px;
    align-items: center;
    width: 100%;
    h1 {
        font-size: 48px;
        font-weight: 900;
        padding-bottom: 40px;
    }

`


const ErrorMessage = ({height, errorMessage}) => {
    console.log(height);
    return(
        <Wrapper height={height}>
            <h1>{errorMessage}</h1>
            
        </Wrapper>
    );
};

export default ErrorMessage;