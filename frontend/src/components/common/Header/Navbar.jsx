import styled from "styled-components";
import { NavLink } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    background: ${props => props.theme.header.background_color};
    //box-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);
    z-index: 10;
`

const CenterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1100px;
    
`
const LowerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 48px;
`


const NavWrapper = styled.nav`
    display: flex;
    height: 100%;
    flex-direction: row;
    align-items: center;
`


const NavText = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    padding: 0 12px;
    font-size: 14px;
    border-radius: 7px;
    color: ${props => props.theme.header.font_color};
    transition: color 0.3s ease, background-color 0.3s ease;
    margin-right: 22px;
    font-weight: 500;
    &:hover {
        color: #fff;
        opacity: 1;
        background-color: rgba(255, 255, 255, 0.15);
    }

    &.active {
        color: #03FFD4;
        background-color: rgba(0, 0, 0, 0.2);
        opacity: 1;
    }
`

const ContactWrapper = styled.div`
    width: 100px;
    height: 100%;
    background-color: black;
`

const PatchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 183, 170, 0.95);
    height: 42px;
    font-weight: 500;
`

const PatchLink = styled.a`
    color: white;
    font-size: 14px;
`;



const Navbar = ({ishome, region}) => {
    const patch_Link = "https://www.leagueoflegends.com/en-us/news/game-updates/patch-14-5-notes";
    return (
        <HeaderWrapper>
            <Header>
                
                
                <CenterWrapper>
                    {!ishome &&<HeaderSearch region={region}/>} 
                    <LowerWrapper>
                        <NavWrapper>
                            <NavText to="/">Home</NavText>
                            <NavText to="/champions">Champions</NavText>
                        </NavWrapper>
                        
                    </LowerWrapper>
                    
                </CenterWrapper> 
            </Header>
            
            <PatchWrapper>
                <PatchLink href="https://www.leagueoflegends.com/en-us/news/tags/patch-notes/" target="_blank" rel="noopener noreferrer">🔔 Check Out The Latest Patch (14.8)</PatchLink>
            </PatchWrapper>
            
      </HeaderWrapper>
    );
}

export default Navbar