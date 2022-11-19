import { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { sliderItems } from '../../data';
import { isMobile, isAndroid } from 'react-device-detect';
import AuthService from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';

const Title = styled.h2`
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 40px 0;
  ${mobile({
    display: 'none;',
  })};
`;

const ButtonBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  ${mobile({
    display: 'none',
  })};
`;
const NavMenu = styled.div`
  width: 50px;
  height: 50px;
  font-size: 20px;
  background-color: #2c8cb3;
  border-radius: 0.5em;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: auto;
  cursor: pointer;
  z-index: 2;
  position: relative;
  margin: 0.3em;
  color: white;
  &:hover {
    background-color: #1e3269;
    transform: scale(1.05);
  }
  &:active {
    background-color: #1e3269;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({
    display: 'none',
  })};
`;

const Wrapper = styled.div`
  display: flex;
  transition: all 0.1s ease-in-out;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  cursor: pointer;
`;

const Index = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === 'tiyu') {
      setSlideIndex(slideIndex === 0 ? slideIndex + 0 : 0);
    } else if (direction === 'real') {
      setSlideIndex(slideIndex === 1 ? slideIndex + 0 : 1);
    } else if (direction === 'lottry') {
      setSlideIndex(slideIndex === 2 ? slideIndex + 0 : 2);
    } else if (direction === 'game') {
      setSlideIndex(slideIndex === 3 ? slideIndex + 0 : 3);
    } else if (direction === 'esport') {
      setSlideIndex(slideIndex === 4 ? slideIndex + 0 : 4);
    } else if (direction === 'chess') {
      setSlideIndex(slideIndex === 5 ? slideIndex + 0 : 5);
    } else if (direction === 'fish') {
      setSlideIndex(slideIndex === 6 ? slideIndex + 0 : 6);
    }
  };
  const handleClickLink = () => {
    AuthService.isLogin() &&
      window.open('https://www.588fifa-aw.vip:588/?p=r8689');
    !AuthService.isLogin() && navigate('/login');
  };
  return (
    <>
      {(isMobile || isAndroid) &&
        // MOBILE
        null}
      <Title>热门游戏</Title>
      <ButtonBar>
        <NavMenu
          direction='tiyu'
          onClick={() => handleClick('tiyu')}
        >
          体育赛事
        </NavMenu>

        <NavMenu
          direction='real'
          onClick={() => handleClick('real')}
        >
          真人娱乐
        </NavMenu>

        <NavMenu
          direction='lottry'
          onClick={() => handleClick('lottry')}
        >
          全球彩票
        </NavMenu>

        <NavMenu
          direction='game'
          onClick={() => handleClick('game')}
        >
          电子游戏
        </NavMenu>

        <NavMenu
          direction='esport'
          onClick={() => handleClick('esport')}
        >
          电子竞技
        </NavMenu>

        <NavMenu
          direction='chess'
          onClick={() => handleClick('chess')}
        >
          真人棋牌
        </NavMenu>

        <NavMenu
          direction='fish'
          onClick={() => handleClick('fish')}
        >
          捕鱼王
        </NavMenu>
      </ButtonBar>

      <Container>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide key={item.id}>
              <ImgContainer>
                <Image
                  src={item.img}
                  onClick={handleClickLink}
                />
              </ImgContainer>
            </Slide>
          ))}
        </Wrapper>
      </Container>
    </>
  );
};

export default Index;
