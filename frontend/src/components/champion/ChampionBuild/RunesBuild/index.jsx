import styled from "styled-components";
import SingleChampion from "../../../ChampionImages/ChampionIcon";
import { useAppData } from "../../../../contexts/AppDataContext";
import StatMods from "../../../../Json/statMods";

const Wrapper = styled.div`
    background-color: rgb(34, 34, 54);
    
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border-radius: 6px;
`

const Title = styled.div`
    display: flex;
    background-color: #2e2e43;
    justify-content: center;
    width: 100%;
    padding: 10px;
    font-weight: 600;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
`

const RuneContent = styled.div`
    width: 100%;
    padding: 10px;
`

const Runes = styled.div`
    width: 100%;
    background-color: #2e2e43;
    border-radius: 6px;
`

const RunesHeader = styled.div`
    background-color: rgb(26, 26, 41);
    padding: 10px 7px;
    font-size: 12px;
    font-weight: 600;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    border: 1px solid #2e2e43;
`

const RunesBody = styled.div`
    display: flex;
    width: 100%;
    padding: 25px;
    justify-content: center;
    align-items: flex-end
    
`

const RuneWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 175px;
    &:not(:last-child) {
        margin-right: 75px;
        width: 200px;
    }
    
`;

const RuneTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.first ? `24px` : `32px`};
    gap: 10px;
    font-size: 14px;
    font-weight: 500;


`

const RuneRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    p {
        position: absolute;
        width: 0px;
        height: 0px;
        font-size: 0;
    }
`

const Breaker = styled.div`
    width: 95%;
    margin-top: 14px;
    background-color:rgb(202, 215, 226);
    height: 1px;
    opacity: 0.6;
`

const RuneImageWrapper = styled.div`
    display: flex;
    width: ${props => props.width || '36px'};
    height: ${props => props.height || '36px'};
    justify-content: center;
    
    img {
        width: ${props => props.width || '36px'};
        height: ${props => props.height || '36px'};
    }

    /* Styles for when the rune is selected */
    ${props => !props.selected && `
        border: 2px solid blue;
        border-radius: 50%; /* Example border styling */
        mix-blend-mode: luminosity;
        opacity: 0.3;
    `}
`;
const RuneBuild = ({selectedRune, championData}) => {
    const { runesIcon} = useAppData();
    let runesArray = []
    if (selectedRune) {
        runesArray = selectedRune
            .replace(/[()\s]/g, '') // Remove parentheses and whitespace
            .split(',');
    }
    const runes8000s = Object.keys(runesIcon).filter(runeId => {
        return parseInt(runeId) >= 8000 && parseInt(runeId) < 8100;
    });

    const precisionTreeImages = runes8000s.map(id => runesIcon[id]);
    const runeTrees = runesIcon.trees
    let primaryStyle, secondaryStyle;

    if (runeTrees) {
        const primaryStyleId = parseInt(runesArray[0].substring(0, 2)); // Extract first two digits and convert to number
        primaryStyle = primaryStyleId * 100;
        if (primaryStyle > 8500) {
            primaryStyle = 8100;
        }
        const secondaryStyleId = parseInt(runesArray[4].substring(0, 2)); // Extract first two digits and convert to number
        secondaryStyle = secondaryStyleId * 100;
        
    }
    const primaryStyleIdsBySlot = {};
    const secondaryStyleIdsBySlot = {};
    const statModBySlot = {};
    Object.entries(runesIcon).forEach(([id, data]) => {
        if (data.tree === runeTrees[primaryStyle].name) {
            if (!primaryStyleIdsBySlot[data.slot]) {
            primaryStyleIdsBySlot[data.slot] = [];
            }
            primaryStyleIdsBySlot[data.slot].push(id);
        }
        if (data.tree === runeTrees[secondaryStyle].name) {
            if (!secondaryStyleIdsBySlot[data.slot]) {
                secondaryStyleIdsBySlot[data.slot] = [];
            }
            secondaryStyleIdsBySlot[data.slot].push(id);
        }
    });
    if (runesIcon.stats) {
        Object.entries(runesIcon.stats).forEach(([id, data]) => {

            if (!statModBySlot[data.slot]) {
                statModBySlot[data.slot] = [];
            }
            statModBySlot[data.slot].push(id);
        });
    }
    // Initialize startIndex outside of the return statement
    let startIndex = 6;

    const Increment = Object.entries(StatMods)
        .map(([slot, stats]) => (
            <RuneRow key={slot}>
                {stats.map(stat => (
                    <RuneImageWrapper
                        key={stat.id}
                        width={"40px"}
                        height={"40px"}
                        selected={runesArray[startIndex] === stat.id.toString()}
                    >
                        <img src={stat.icon} />
                    </RuneImageWrapper>
                ))}
                <p>{startIndex  += 1}/</p> {/* Increment startIndex by 6 */}
            </RuneRow>
        ));

    return (
        <Wrapper>
            <Title>
                <span>Runes</span>
            </Title>
            {runeTrees && (
                <RuneContent>
                    <Runes>
                        <RunesHeader> Runes</RunesHeader>
                        <RunesBody>
                            <RuneWrapper>
                                <RuneTitle first={true}>
                                    <RuneImageWrapper width={"40px"} height={"40px"} selected={true}>
                                        <img src={runeTrees[primaryStyle].icon} />
                                    </RuneImageWrapper>
                                    <h4>{runeTrees[primaryStyle].name}</h4>
                                </RuneTitle>
                                {Object.entries(primaryStyleIdsBySlot).map(([slot, ids]) => (
                                    <RuneRow key={slot}>
                                        {ids.map(id => (
                                            <RuneImageWrapper width={"40px"} height={"40px"} selected={runesArray.includes(id)}>
                                                <img src={runesIcon[id].icon} />
                                            </RuneImageWrapper>
                                        ))}
                                    </RuneRow>
                                ))}
                            </RuneWrapper>
                            <RuneWrapper>
                                <RuneTitle>
                                    <RuneImageWrapper width={"40px"} height={"40px"} selected={true}>
                                        <img src={runeTrees[secondaryStyle].icon} />
                                    </RuneImageWrapper>
                                    <h4>{runeTrees[secondaryStyle].name}</h4>
                                </RuneTitle>
                                {Object.entries(secondaryStyleIdsBySlot)
                                    .slice(1) // Exclude the first slot
                                    .map(([slot, ids]) => (
                                        <RuneRow key={slot}>
                                            {ids.map(id => (
                                                <RuneImageWrapper
                                                    key={id}
                                                    width={"40px"}
                                                    height={"40px"}
                                                    selected={runesArray.includes(id)}
                                                >
                                                    <img src={runesIcon[id].icon} />
                                                </RuneImageWrapper>
                                            ))}
                                        </RuneRow>
                                    ))}
                            </RuneWrapper>
                            <RuneWrapper>
                                <RuneTitle>
                                    <h5> Rune Stats</h5>
                                </RuneTitle>
                                {Increment}
                            </RuneWrapper>
                        </RunesBody>
                    </Runes>
                </RuneContent>
            )}
        </Wrapper>
    );
};

export default RuneBuild