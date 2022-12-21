import BottomNavbar from '../../../components/mobile/BottomNavbar';
import TopBackNavBar from '../../../components/mobile/TopBackNavBar';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { chat_service } from '../../../assets';
import { useNavigate } from 'react-router-dom';

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
  margin-right: 1rem;
  border-radius: 2rem;
  border: none;
`;

const Index = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.tidioChatApi.show();
    window.tidioChatApi.open();
  };
  const handleClick2 = () => {
    navigate('/chats');
  };
  return (
    <Container>
      <TopBackNavBar />
      <Img src={chat_service}></Img>
      <InnerContainer>
        <Btn
          size='lg'
          onClick={handleClick}
          variant='primary'
        >
          线上客服
        </Btn>
        <Btn
          size='lg'
          onClick={handleClick2}
          variant='success'
        >
          导师聊天
        </Btn>
      </InnerContainer>
      <BottomNavbar />
    </Container>
  );
};

export default Index;
