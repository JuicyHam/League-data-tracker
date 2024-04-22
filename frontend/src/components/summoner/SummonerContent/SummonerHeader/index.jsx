import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 150px;
    background-color: #2e2e43;
    border-radius: 6px;
`

const Title = styled.h2`
    font-size: 28px;
    font-weight: 600;
`

const SummonerHeader = () => {
    return (
        <Wrapper>
            <Title>
                JuicyHam
            </Title>
        </Wrapper>
    );
}

export default SummonerHeader;