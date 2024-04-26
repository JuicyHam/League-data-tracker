import styled from "styled-components";
import SingleChampion from "../../ChampionImages/ChampionIcon";
import { Arrow } from "../../../styles/ChampionStyled";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    background-color: #2e2e43;
    width: 100%;
    border-radius: 6px;
`

const PriorityWrapper = styled.div`
    padding: 20px;
    border-right: 1px solid #181820;
    
`

const Title = styled.div`
    display: flex;
    span {
        font-size: 12px;
        font-weight: 300;
        opacity: 0.7;
    }
    h3 {
        font-size: 14px;
        font-weight: 700;
        margin-right: 15px;
    }
    margin-bottom: 20px;
`

const PriorityPreview = styled.div`
    display: flex;
    flex-direction: column;
    
`

const PriorityImages = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`

const PriorityText = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    p {
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 5px;
    }

    span {
        font-size: 11px;
        font-weight: 300;
        opacity: 0.7;
    }
`

const PathWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    flex: 1;
`

const AbilityRow = styled.div`
    display: flex;
    margin-bottom: 6px;
`

const SkillLabel = styled.div`
    flex: 1 1;
    background-color: #11112a;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;

    p {
        font-size: 12px;
        font-weight: 600;
        margin-left: 10px;
    }
`

const AbilityWrapper = styled.div`
    display: flex;
    flex: 1 1;
    display: flex;
    justify-content: center;
`

const AbilityBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 6px;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    background-color: ${props => props.selected ? "White" : "Black"};

`


const ChampionAbilities = () => {
    const abilities = Array.from({ length: 17 }, (_, index) => (
        <AbilityBox key={index} selected={false} />
      ));
    return(
        <Wrapper>
            <PriorityWrapper>
                <Title>
                    <h3>Skill Priority</h3>
                </Title>
                <PriorityPreview>

                </PriorityPreview>
                    <PriorityImages>
                        <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                        <Arrow height={"16px"}/>
                        <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                        <Arrow height={"16px"}/>
                        <SingleChampion championId={221} width={"32px"} height={"32px"}/>
                    </PriorityImages>
                    <PriorityText>
                        <p>51% WR</p>
                        <span>25000 Games</span>
                    </PriorityText>
            </PriorityWrapper>
            <PathWrapper>
                <Title>
                    <h3>Skill Path</h3>
                    <span> Most popular ability order</span>
                </Title>
                <div>
                    <AbilityRow>
                        <SkillLabel>
                            <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                            <p>Zeri Move</p>
                        </SkillLabel>

                        <AbilityWrapper>
                            <AbilityBox selected={true} />
                            {abilities}
                        </AbilityWrapper>
                    </AbilityRow>
                    <AbilityRow>
                        <SkillLabel>
                            <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                            <p>Zeri Move</p>
                        </SkillLabel>

                        <AbilityWrapper>
                            {abilities}
                            <AbilityBox selected={true} />
                        </AbilityWrapper>
                    </AbilityRow>
                    <AbilityRow>
                        <SkillLabel>
                            <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                            <p>Zeri Move</p>
                        </SkillLabel>

                        <AbilityWrapper>
                            <AbilityBox selected={true} />
                            {abilities}
                        </AbilityWrapper>
                    </AbilityRow>
                    <AbilityRow>
                        <SkillLabel>
                            <SingleChampion championId={221} width={"24px"} height={"24px"}/>
                            <p>Zeri Move</p>
                        </SkillLabel>

                        <AbilityWrapper>
                            {abilities}
                            <AbilityBox selected={true} />
                        </AbilityWrapper>
                    </AbilityRow>
                </div>
            </PathWrapper>
        </Wrapper>
    );
};

export default ChampionAbilities;