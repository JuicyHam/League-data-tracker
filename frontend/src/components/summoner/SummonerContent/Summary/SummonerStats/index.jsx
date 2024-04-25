import styled from "styled-components";
import RankContent from "./RankContent";
import RankStats from "./RankStats";

const Wrapper = styled.div`
    width: 300px;
    margin-right: 10px;
    
`



const SummonerStats = () => {
    return (
        <Wrapper>
            <RankContent />
            <RankStats />
        </Wrapper>
    ); 
}

export default SummonerStats;