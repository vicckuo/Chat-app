import styled from "styled-components";
import BoltIcon from '@mui/icons-material/Bolt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupsIcon from '@mui/icons-material/Groups';
import { services_bg } from "../../assets";
import { mobile } from "../../responsive";

const Title = styled.h2`
    font-size: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 40px 0;
    ${mobile({ display: "none" })}
`

const Container = styled.div`
    width: 1280px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    ${mobile({ display: "none" })}
`

const Services = styled.div`
    width: 285px;
    height: 340px;
    background-image: url(${services_bg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-right: 30px;
    padding: 30px;
    margin: 0 auto;
`

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #78b2d3;
`

const ServicesTitle = styled.h3`
    color: white;
    flex: 1;
    font-size: 22px;
    margin: 22px auto;
`

const ServicesText = styled.p`
    color: #A1C5DB;
    padding: 0 10px;
`

const Index = () => {
    return (
        <>
            <Title>
                顶尖优质服务
            </Title>
            <Container>
                <Services>
                    <Icon>
                        <BoltIcon sx={{ fontSize: 100 }} />
                    </Icon>
                    <ServicesTitle>
                        快速更新响应
                    </ServicesTitle>
                    <ServicesText>
                        我们的延迟是最低的。拥有较佳的响应速度，部分数据较同行竞品快0.5至1秒。
                    </ServicesText>
                </Services>
                <Services>
                    <Icon>
                        <MonetizationOnIcon sx={{ fontSize: 100 }} />
                    </Icon>
                    <ServicesTitle>
                        极具性价比
                    </ServicesTitle>
                    <ServicesText>
                        我们致力于提供具有成本效益的高质量服务，在节省资金的同时提高数据性能。
                    </ServicesText>
                </Services>
                <Services>
                    <Icon>
                        <QuestionAnswerIcon sx={{ fontSize: 100 }} />
                    </Icon>
                    <ServicesTitle>
                        1对1服务沟通支持
                    </ServicesTitle>
                    <ServicesText>
                        为合作方提供7×24小时的1对1服务，提供快速技术顾问指导。
                    </ServicesText>
                </Services>
                <Services>
                    <Icon>
                        <GroupsIcon sx={{ fontSize: 100 }} />
                    </Icon>
                    <ServicesTitle>
                        专业数据维护开发团队
                    </ServicesTitle>
                    <ServicesText>
                        深耕15年的经验，对市场用户的深入了解，帮助您的产品获得更多用户的青睐。
                    </ServicesText>
                </Services>
            </Container>
        </>
    );
}

export default Index;
