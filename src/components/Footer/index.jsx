import { Logo } from '../../assets';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { isMobile, isAndroid } from 'react-device-detect';

const Container = styled.div`
  width: 1280px;
  display: flex;
  background-color: #101434;
  border-radius: 0.4em;
  width: 100%;
  border-bottom: 1px solid #484848;
  margin: 80px 0 0;
  align-items: center;
  justify-content: center;
  ${mobile({ display: 'none' })}
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  margin: 0 auto;
`;

const Index = () => {
  return (
    <>
      {isMobile || isAndroid ? null : (
        <>
          <Container>
            <Image
              src={Logo}
              alt='footer_logo'
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Index;
