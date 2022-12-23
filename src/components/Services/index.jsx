import styled from 'styled-components';
import BoltIcon from '@mui/icons-material/Bolt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupsIcon from '@mui/icons-material/Groups';
import { services_bg } from '../../assets';
import { mobile } from '../../responsive';
import { isMobile, isAndroid } from 'react-device-detect';

const Title = styled.h2`
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 40px 0;
  ${mobile({ display: 'none' })}
`;

const Container = styled.div`
  width: 1280px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  ${mobile({ display: 'none' })}
`;

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
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #78b2d3;
`;

const ServicesTitle = styled.h3`
  color: white;
  flex: 1;
  font-size: 22px;
  margin: 22px auto;
`;

const ServicesText = styled.p`
  color: #a1c5db;
  padding: 0 10px;
`;

const Index = () => {
  return (
    <>
      {isMobile || isAndroid ? null : (
        <>
          <Title>Our Services</Title>
          <Container>
            <Services>
              <Icon>
                <BoltIcon sx={{ fontSize: 100 }} />
              </Icon>
              <ServicesTitle>Service1</ServicesTitle>
              <ServicesText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ServicesText>
            </Services>
            <Services>
              <Icon>
                <MonetizationOnIcon sx={{ fontSize: 100 }} />
              </Icon>
              <ServicesTitle>Service2</ServicesTitle>
              <ServicesText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ServicesText>
            </Services>
            <Services>
              <Icon>
                <QuestionAnswerIcon sx={{ fontSize: 100 }} />
              </Icon>
              <ServicesTitle>Service3</ServicesTitle>
              <ServicesText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ServicesText>
            </Services>
            <Services>
              <Icon>
                <GroupsIcon sx={{ fontSize: 100 }} />
              </Icon>
              <ServicesTitle>Service4</ServicesTitle>
              <ServicesText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </ServicesText>
            </Services>
          </Container>
        </>
      )}
    </>
  );
};

export default Index;
