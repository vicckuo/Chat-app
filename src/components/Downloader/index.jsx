import styled from 'styled-components';
import { app_girl } from '../../assets';
import Button from 'react-bootstrap/Button';
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
    window.open('https://google.com');
  };

  return (
    <>
      {isMobile || isAndroid ? null : (
        <>
          <Title>Title</Title>
          <Container>
            <LeftContainer>
              <img
                src={app_girl}
                alt=''
              />
            </LeftContainer>
            <RightContainer>
              <InnerTitle>
                Chat APP
                <br />
                Download
              </InnerTitle>

              <InnerText>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Maxime, dolore voluptatum? Ratione delectus quibusdam magni
                iusto consequatur eos pariatur dicta necessitatibus vel modi
                saepe non commodi reprehenderit atque, maxime nulla.
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
      )}
    </>
  );
};

export default Index;
