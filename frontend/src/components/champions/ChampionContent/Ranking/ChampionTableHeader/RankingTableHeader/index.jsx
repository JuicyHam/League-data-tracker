import styled from "styled-components";

const Wrapper = styled.th`
  vertical-align: middle;
  background-color: #565685;
  border-radius: ${props => {
    if (props.pos === "first") {
      return `6px 0 0 0`;
    } else if (props.pos === "last") {
      return `0 6px 0 0`;
    }
  }};
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.left ? "none" : "center"};
    padding: 4px;
    align-items: center;
    
`

const HeaderText = styled.span`
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 2px 0;
    min-height: 32px;
`

const RankingTableHeader = ({title, left, pos}) => {
    return (
        <Wrapper pos={pos}>
            <TextWrapper left={left} >
                <HeaderText >
                    {title}
                </HeaderText>
            </TextWrapper>
        </Wrapper>
    );
}

export default RankingTableHeader;