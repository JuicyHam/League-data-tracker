import styled from "styled-components";
import MatchTab from "./MatchTab";

const Wrapper = styled.div`
    width: 100%;
`



const MatchContent = () => {
    return(
        <Wrapper>
            <MatchTab/>
            <MatchTab/>
        </Wrapper>
    );
};

export default MatchContent;