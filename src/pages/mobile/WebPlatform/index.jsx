import BottomNavbar from '../../../components/mobile/BottomNavbar';
import TopBackNavBar from '../../../components/mobile/TopBackNavBar';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { web_platform } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../Services/AuthService';

const Container = styled.div``;
const Img = styled.img`
  width: 100%;
  margin-bottom: 30px;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled(Button)`
  border-radius: 2rem;
  border: none;
`;

const Index = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    AuthService.isLogin() && window.open('https://google.com');
    !AuthService.isLogin() && navigate('/login');
  };
  return (
    <Container>
      <TopBackNavBar />
      <Img src={web_platform}></Img>
      <InnerContainer>
        <Btn
          size='lg'
          onClick={handleClick}
          variant='primary'
        >
          前往平台
        </Btn>
      </InnerContainer>
      <BottomNavbar />
    </Container>
  );
};

export default Index;
