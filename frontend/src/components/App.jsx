import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './home'
import Champions from './champions';
import Champion from './champion';
import {dark} from '../common/theme'
import styled, {ThemeProvider} from 'styled-components'
import GlobalStyles from '../styles/GlobalStyled';
import { AppDataProvider } from '../contexts/AppDataContext';
import Summoner from './summoner';


const AppWrapper = styled.div`
  min-width: 1100px;
  height: 100%; 
`

function App() {
  return (
    
    <ThemeProvider theme={dark}>
      <GlobalStyles/>
      <AppWrapper>
        <AppDataProvider>
          <Router>
            <Routes>
              
              <Route path="/" element={<Home/>} />         
              <Route path="/champions" element={<Champions/>}/>
              
              
              <Route path="/champion/:championName" element={<Champion />} />
              <Route path="/summoner/:region/:summonerName/*" element={<Summoner />} />
            </Routes>
          </Router>
        </AppDataProvider>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
