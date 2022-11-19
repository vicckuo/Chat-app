import styled from 'styled-components';
import { app_girl } from '../../assets';
import Button from 'react-bootstrap/Button';
import { mobile } from '../../responsive';

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
  display: flex;
  ${mobile({ display: 'none' })}
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightContainer = styled.div`
  flex: 1;
  padding: 200px 0;
`;

const InnerTitle = styled.h3`
  color: white;
  font-size: 50px;
`;

const InnerText = styled.p`
  width: 600px;
  color: #a1c5db;
  font-size: 22px;
`;

const Index = () => {
  const handleClick = () => {
    window.open('https://mono-ex.com/qqm');
  };

  return (
    <>
      <Title>畅游行动装置</Title>
      <Container>
        <LeftContainer>
          <img
            src={app_girl}
            alt=''
          />
        </LeftContainer>
        <RightContainer>
          <InnerTitle>
            全球梦体育 APP
            <br />
            随时随地 即刻拥有
          </InnerTitle>

          <InnerText>
            全球梦体育支持所有移动端，随时随意手机投注，提供全球热门游戏资源丰富体育赛事、电竞赛事、真人娱乐、彩票投注及电子游艺等，立即扫码即刻下载。
          </InnerText>
          <Button
            onClick={handleClick}
            size='lg'
            variant='primary'
          >
            iOS & Andriod
          </Button>
        </RightContainer>
      </Container>
    </>
  );
};

export default Index;
