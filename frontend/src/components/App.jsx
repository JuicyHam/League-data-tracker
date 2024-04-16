import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './home'
import Champion from './champions';
import {dark} from '../common/theme'
import styled, {ThemeProvider} from 'styled-components'
import GlobalStyles from '../styles/GlobalStyled';
import { RegionProvider } from '../contexts/RegionContext';

const AppWrapper = styled.div`
  min-width: 1100px;
  height: 100%; 
`

function App() {
  return (
    
    <ThemeProvider theme={dark}>
      <GlobalStyles/>
      <AppWrapper>
        <RegionProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />         
              <Route path="/champions" element={<Champion/>}/>
            </Routes>
          </Router>
        </RegionProvider>
        <p>TEST</p>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
