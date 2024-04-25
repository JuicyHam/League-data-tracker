import styled from "styled-components";
import MatchTab from "./MatchTab";
import { useSummonerData } from "../../../../../../contexts/summonerData";

const Wrapper = styled.div`
    width: 100%;
`



const MatchContent = () => {
    const {summonerData} = useSummonerData();
     // Check if summonerData exists
     if (!summonerData) {
        return <div>Loading...</div>; // Or any loading indicator
    }
    const {matches} = summonerData;
    console.log(summonerData);
    return (
        <Wrapper>
            {matches.map((match, index) => (
                <MatchTab key={index} index={index} />
            ))}
        </Wrapper>
    );
};

export default MatchContent;