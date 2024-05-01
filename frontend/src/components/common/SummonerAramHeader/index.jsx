import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 6px;
`

const TitleWrapper = styled.div`

`


const TitleMain = styled.span`
    font-weight: 600;
    color: #fff;
    font-size: 32px;
    margin-bottom: 10px;
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const TitleDescription = styled.span`
    opacity: 0.6;
    width: 60%;
`

const UpdateWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 34px;
    background: rgb(46, 46, 67);
    border-radius: 6px;
    padding: 0 12px;
`

const StrongText = styled.span`
    font-weight: 600;
`

const LightText = styled.span`
    font-weight: 200;
    opacity: 0.4;
`

const SearchTitle = () => {
    return (
        <Wrapper>
            
            <TitleMain>Summoners Rift Tier List</TitleMain>
            <DescriptionWrapper>
                <TitleDescription>
                    Tier information for LoL patch 14.08 is updated in real-time. Summoner’s Rift champion analysis provides you with builds, 
                    runes and items to help you win!
                </TitleDescription>
                <UpdateWrapper>
                    <StrongText>Ranked Solo</StrongText>
                    <LightText>&nbsp; / &nbsp;</LightText>
                    <span>Last Updated:&nbsp;</span>
                    <StrongText>1 Hours Ago</StrongText>
                </UpdateWrapper>
            </DescriptionWrapper>
            
        </Wrapper>
    );
}

export default SearchTitle;