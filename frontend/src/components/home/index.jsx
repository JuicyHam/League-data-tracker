import Searchbar from "../common/searchbar";
import Footer from "../common/Footer";
import Navbar from "../common/Header/Navbar";
import { HomeContainer } from "../../styles/homeStyled";
import styled from "styled-components";

const Wrapper = styled.div`
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
`


const Home = () => {
    return (
        <Wrapper>
            <Navbar ishome={true} />
            <HomeContainer>
                <div className="home">
                    <h2>
                        <img src="Logo.png" alt="TEMPNAME"></img>
                    </h2>
                    <Searchbar />
                </div>
            </HomeContainer>
        </Wrapper>
    );
}

export default Home