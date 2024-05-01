import styled from "styled-components";
import { useAppData } from "../../../../contexts/AppDataContext";
import { useEffect, useState } from "react";
import { useSummonerData } from "../../../../contexts/summonerData";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 150px;
    background-color: #2e2e43;
    border-radius: 6px;
    padding: 15px;
`

const Title = styled.h2`
    font-size: 24px;
    font-weight: 600;

    span {
        margin-left: 5px;
        font-size: 20px;
        opacity: 0.6;
        font-weight: 300;
    }

`

const Icon = styled.div`
    position: relative;

    img {
        width: 100px;
        height: 100px;
        border-radius: 6px;
    }

    p {
        position: absolute;
        display: flex;
        top: 90px;
        left: 50%;
        transform: translateX(-50%);
        height: 25px;
        min-width: 40px;
        background: linear-gradient(#9198e5,#824296);
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        font-weight: 400;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
    padding-left: 15px;
`

const UpdateWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const UpdateButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(105, 111, 234);
    width: 120px;
    height: 32px;
    border-radius: 6px;
    font-size: 12px;
    
    span {
        font-weight: 400;
    }
`

const UpdateText = styled.span`
    padding-left: 10px;
    padding-bottom: 2px;
    margin-top: auto;
    font-size: 11px;
    color: rgb(167, 167, 175);
`

const formatTimeDifference = (time) => {
    const currentTime = new Date();
    const oldTime = new Date(time);
    const differenceInMillis = currentTime - oldTime;
    const seconds = Math.floor(differenceInMillis / 1000);
    if (seconds < 120) {
        const timeLeft = 120 - seconds;
        return `Update available in ${timeLeft} second${timeLeft !== 1 ? 's' : ''}`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `Last Updated: ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `Last Updated: ${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `Last Updated: ${days} day${days !== 1 ? 's' : ''} ago`;
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
        return `Last Updated: ${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    }

    const months = Math.floor(days / 30);
    return `Last Updated: ${months} month${months !== 1 ? 's' : ''} ago`;
}

const SummonerHeader = ({onUpdate}) => {
    const { summonerData} = useSummonerData();
    const {accountInfo, summonerInfo, updated} = summonerData;
    const {playerIcons} = useAppData();
    const [updatedTime, setUpdatedTime] = useState(formatTimeDifference(updated || (new Date()).setHours((new Date()).getHours() - 1)));
    const handleUpdate = () => {
        onUpdate(); // Call the onUpdate function when update button is clicked
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setUpdatedTime(formatTimeDifference(updated));
        }, 1000);

        return () => clearInterval(interval);
    }, [updated]);
    
    return (
        <Wrapper>
            <Icon>
                <img src={playerIcons[summonerInfo.profileIconId]} />
                <p>{summonerInfo.summonerLevel}</p>
            </Icon>
            <Info>
                <Title>
                    {accountInfo.gameName}
                    <span>
                        #{accountInfo.tagLine}
                    </span>
                </Title>
                <UpdateWrapper>
                    <UpdateButton onClick={handleUpdate}>
                        <span>Update</span>
                    </UpdateButton>
                    <UpdateText>
                        {updatedTime}
                    </UpdateText>
                </UpdateWrapper>
            </Info>
            
        </Wrapper>
    );
}

export default SummonerHeader;