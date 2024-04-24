import styled from "styled-components";
import MatchType from "./MatchType";
import MatchContent from "./MatchContent";

const Wrapper = styled.div`
    width: 790px;
    height: 500px;
    border-radius: 6px;
`


const Matches = () => {
    return (
        <Wrapper>
            <MatchType/>
            <MatchContent/>
        </Wrapper>
    ); 
}

export default Matches;