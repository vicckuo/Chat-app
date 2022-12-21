import React, { useContext, useEffect, useState } from 'react';
import { ChatState } from '../../../Context/ChatProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../../utils/APIRoutes';
import axios from 'axios';
import { UserContext } from '../../../Context/contexts';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import ChatLoading from '../ChatLoading';
import { getSender } from '../../../config/ChatLogics';
import ListGroup from 'react-bootstrap/ListGroup';
import GroupChatModal from '../GroupChatModal';
import { mobile } from '../../../responsive';
import AuthService from '../../../Services/AuthService';
import BottomNavbar from '../../../components/mobile/BottomNavbar';

const Container = styled.div`
  width: 31%;
  display: flex;

  ${mobile({
    margin: '0.5rem auto',
    width: '100%',
    height: '80vh',
    display: (props) => props.dis,
  })}

  .box {
    padding-bottom: 3px;
    font-size: 28px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .chats {
    display: flex;
    flex-direction: column;
    padding: 3px;
    background: #959595;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    overflow-y: hidden;
    .chats-scroll-bar {
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0.5rem;

        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
    }
  }
`;

const Index = ({ fetchAgain }) => {
  const toastOptions = {
    position: 'top-left',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  };
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const currentUser = useContext(UserContext);

  useEffect(() => {
    setLoggedUser(AuthService.getCurrentUser());
    fetchChats();
    // console.log('loggedUser', loggedUser);
  }, [fetchAgain]);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      const { data } = await axios.get(`${host}/api/chat`, config);
      setChats(data);
      // console.log('data', data);
    } catch (error) {
      console.log(error);
      return toast.error('查询结果失败', toastOptions);
    }
  };

  return (
    <>
      <Container
        dis={selectedChat ? 'none' : 'flex'}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: '3px',
          background: 'gray',
          borderRadius: '1rem',
          borderWidth: '1px',
        }}
      >
        <div className='box'>
          我的聊天
          <GroupChatModal>
            <Button variant='primary'>新群组</Button>
          </GroupChatModal>
        </div>

        <div className='chats'>
          {chats ? (
            <div className='chats-scroll-bar'>
              {chats.map((chat) => (
                <ListGroup key={chat._id}>
                  <ListGroup.Item
                    action
                    onClick={() => setSelectedChat(chat)}
                  >
                    {!chat.isGroupChat
                      ? getSender(currentUser, chat.users)
                      : chat.chatName}
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </div>
          ) : (
            <ChatLoading />
          )}
        </div>
      </Container>
      <BottomNavbar />
    </>
  );
};

export default Index;
