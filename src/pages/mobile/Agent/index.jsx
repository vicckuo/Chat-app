import BottomNavbar from '../../../components/mobile/BottomNavbar';
import TopBackNavBar from '../../../components/mobile/TopBackNavBar';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { chat_service } from '../../../assets';

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
  const handleClick = () => {
    window.tidioChatApi.show();
    window.tidioChatApi.open();
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
      </InnerContainer>
      <BottomNavbar />
    </Container>
  );
};

export default Index;
