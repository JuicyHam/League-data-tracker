import styled from "styled-components";
import PrimaryBuilds from "./PrimaryBuilds";
import SecondaryBuilds from "./SecondaryBuilds";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;

`

const Builds = () => {
    return(
        <Wrapper>
            <PrimaryBuilds/>
            <SecondaryBuilds/>
        </Wrapper>
    );
};

export default Builds;