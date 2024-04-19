import Navbar from "../common/Header/Navbar";
import styled from "styled-components";

import Footer from "../common/Footer";

const Wrapper = styled.div`
    top: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    
`


const Champion = () => {
    return (
        <Wrapper>
            <Navbar ishome={false} region={"EUW"}/>
            <CenterWrapper>
            </CenterWrapper>    
            <Footer/>    
        </Wrapper>
    );
}

export default Champion