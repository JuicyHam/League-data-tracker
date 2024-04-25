import styled from "styled-components";
import { animated, useSpring } from 'react-spring';

const Wrapper = styled.div`
    min-height: ${props => props.height || `100vh`};
    display: flex;
    flex-direction: column;
    padding-top: 200px;
    align-items: center;
    h1 {
        font-size: 48px;
        font-weight: 900;
        padding-bottom: 40px;
    }

`

const AnimatedSVG = () => {
    // Define animation config
    const props = useSpring({
        from: { strokeDashoffset: 685 },
        to: { strokeDashoffset: -685 },
        loop: { reverse: true },
        config: { duration: 2000 },
    });

    return (
        <animated.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 150"
        style={{ width: '100%', height: '100px' }}
        >
        <animated.path
            fill="none"
            stroke="#B494FF"
            strokeWidth="30"
            strokeLinecap="round"
            strokeDasharray="300 385"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
            style={props}
        />
        </animated.svg>
    );
};

const Loading = ({height}) => {
    console.log(height);
    return(
        <Wrapper height={height}>
            <h1>Loading</h1>
            <AnimatedSVG />
        </Wrapper>
    );
};

export default Loading;