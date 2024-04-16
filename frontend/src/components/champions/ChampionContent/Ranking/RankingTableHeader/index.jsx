import styled from "styled-components";

const Wrapper = styled.th`
    vertical-align: middle;
`

const TextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const HeaderText = styled.span`
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 2px 0;
    min-height: 32px;
`

const RankingTableHeader = ({title}) => {
    return (
        <Wrapper>
            <TextWrapper>
                <HeaderText>
                    {title}
                </HeaderText>
            </TextWrapper>
        </Wrapper>
    );
}

export default RankingTableHeader;