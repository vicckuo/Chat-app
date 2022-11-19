import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AuthService from '../../../Services/AuthService';

const Container = styled.div`
    color: #A1C5DB;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: 80px;
    grid-gap: 1rem;
    box-sizing: border-box;
    padding: 15px;
`
const Category = styled.div`
    color: white;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    &:hover {
        color: #2c8cb3;
    }
    
`

const Icon = styled.div`
    &:hover {
        transform: scale(1.2);
        transform-origin: bottom;
    }
`

const Text = styled.p`
    font-size: 14px;
    margin-top: 0.5rem;
`

const Index = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://web1.sa8888.net/?lang=2")
        )
    }

    const handleClick2 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://quanqiumeng.com/join-us/")
        )
    }

    const handleClick3 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://quanqiumeng.com/aboutus/")
        )
    }

    const handleClick4 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://quanqiumeng.com/category/%e4%bd%93%e8%82%b2%e6%96%b0%e9%97%bb/")
        )
    }

    const handleClick5 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://quanqiumeng.com/category/weixin/")
        )
    }

    const handleClick6 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://qqmtv.top/")
        )
    }

    const handleClick7 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://quanqiumeng.com/experts/")
        )
    }

    const handleClick8 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://quanqiumeng.com/events/")
        )
    }

    const handleClick9 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://quanqiumeng.com/howtouse/")
        )
    }

    const handleClick10 = () => {
        !AuthService.isLogin() && (
            navigate("/login")
        )
        AuthService.isLogin() && (
            window.open("https://quanqiumeng.com/celue_jianyi/")
        )
    }

    return (
        <Container>
            <Category onClick={handleClick}>
                <Icon>
                    <SportsSoccerIcon fontSize="large" />
                </Icon>
                <Text>
                    即时比分
                </Text>
            </Category>
            <Category onClick={handleClick2}>
                <Icon><PersonAddAlt1Icon fontSize="large" /></Icon>
                <Text>
                    网赚加盟
                </Text>
            </Category>
            <Category onClick={handleClick3}>
                <Icon><InfoIcon fontSize="large" /></Icon>
                <Text>
                    关于我们
                </Text>
            </Category>
            <Category onClick={handleClick4}>
                <Icon><ArticleIcon fontSize="large" /></Icon>
                <Text>
                    体育新闻
                </Text>
            </Category>
            <Category onClick={handleClick5}>
                <Icon><AutoGraphIcon fontSize="large" /></Icon>
                <Text>
                    赛事推荐
                </Text>
            </Category>
            <Category onClick={handleClick6}>
                <Icon><MovieFilterIcon fontSize="large" /></Icon>
                <Text>
                    影城专区
                </Text>
            </Category>
            <Category onClick={handleClick7}>
                <Icon><EmojiEventsIcon fontSize="large" /></Icon>
                <Text >
                    战绩专区
                </Text>
            </Category>
            <Category onClick={handleClick8}>
                <Icon><CelebrationIcon fontSize="large" /></Icon>
                <Text>
                    活动专区
                </Text>
            </Category>
            <Category onClick={handleClick9}>
                <Icon><TipsAndUpdatesIcon fontSize="large" /></Icon>
                <Text>
                    新手教程
                </Text>
            </Category>
            <Category onClick={handleClick10}>
                <Icon><ManageSearchIcon fontSize="large" /></Icon>
                <Text>
                    投注计划
                </Text>
            </Category>
        </Container>
    );
}

export default Index;
