import { ChatState } from '../../Context/ChatProvider';
import SideDrawer from '../../components/Miscellaneous/SideDrawer';
import MyChats from '../../components/Miscellaneous/MyChats';
import ChatBox from '../../components/Miscellaneous/ChatBox';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Context/contexts';
import AuthService from '../../Services/AuthService';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 93.5vh;
  color: white;
  padding: 10px;
`;

const Index = () => {
  const navigate = useNavigate();
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    AuthService.getCurrentUser();
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else if (!currentUser.user.isAvatarImageSet) {
      navigate('/setAvatar');
    }
  }, [navigate]);

  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Container>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          />
        )}
      </Container>
    </div>
  );
};

export default Index;
