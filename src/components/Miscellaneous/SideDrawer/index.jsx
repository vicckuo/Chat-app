import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../../../Context/contexts';
import { useContext } from 'react';
import AuthService from '../../../Services/AuthService';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import './index.css';
import { ChatState } from '../../../Context/ChatProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../../../utils/APIRoutes';
import ChatLoading from '../ChatLoading';
import UserListItem from '../../../components/UserListItem';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { getSender } from '../../../config/ChatLogics';

const MainContainer = styled.div`
  background-color: white;
  border-width: 5px;
  color: white;
`;

const Noti = styled.div`
  position: relative;
  cursor: pointer;
`;

const NotiBox = styled.div`
  cursor: pointer;

  :hover {
    background-color: #d0d0d0;
  }
`;

const RedDot = styled.div`
  position: absolute;
  top: 0rem;
  right: -0.2rem;
  background: red;
  padding: 6.4px;
  box-sizing: border-box;
  border-radius: 100%;
`;

const ClearText = styled.p`
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  color: gray;
`;

const PopBody = styled(Popover.Body)`
  width: 100%;
  max-height: 80vh;

  overflow-y: scroll;
`;

const Index = () => {
  const toastOptions = {
    position: 'top-left',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  };

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    //非管理员
    if (!currentUser.user.isAdmin) {
      return toast.error('只有管理员可以搜索', toastOptions);
    }
    setShow(true);
  };

  const currentUser = useContext(UserContext);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const popover = (
    <Popover id='popover-basic'>
      <PopBody>
        {!notification.length && '没有新的讯息'}
        {notification.map((notif) => (
          <NotiBox
            key={notif._id}
            onClick={() => {
              setSelectedChat(notif.chat);
              setNotification(notification.filter((n) => n !== notif));
            }}
          >
            {notif.chat.isGroupChat ? (
              <>
                新讯息来自 {notif.chat.chatName}
                <hr />
              </>
            ) : (
              <>
                新讯息来自 {getSender(user, notif.chat.users)}
                <hr />
              </>
            )}
          </NotiBox>
        ))}
      </PopBody>
      {notification.length ? (
        <ClearText
          onClick={() => {
            setNotification([]);
          }}
        >
          清除所有讯息
        </ClearText>
      ) : null}
    </Popover>
  );

  const handleLogout = () => {
    localStorage.removeItem('chat-app-user');
    window.location.reload();
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    //管理员
    if (!search) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      const { data } = await axios.get(
        `${host}/api/auth?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      return toast.error('查询结果失败', toastOptions);
    }
  };

  const accessChat = async (userId, username) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };

      const { data } = await axios.post(
        `${host}/api/chat`,
        { userId: userId, username: username },
        config
      );

      // console.log(userId);
      // console.log(username);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      handleClose();
    } catch (error) {
      return toast.error('获取聊天失败', toastOptions);
    }
  };

  return (
    <MainContainer>
      <Navbar
        className='color-nav'
        bg='dark'
        variant='dark'
        expand='lg'
      >
        <Container>
          <Button
            variant='success'
            onClick={handleShow}
          >
            搜索用户
          </Button>

          <Offcanvas
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>搜索用戶</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className='d-flex'>
                <Form.Control
                  type='search'
                  placeholder='输入用户名或是email查询'
                  className='me-2'
                  aria-label='Search'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                  variant='outline-success'
                  onClick={handleSearch}
                >
                  搜索
                </Button>
              </Form>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id, user.username)}
                  />
                ))
              )}

              {loadingChat && (
                <Spinner
                  animation='border'
                  role='status'
                >
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              )}
            </Offcanvas.Body>
          </Offcanvas>
          <Noti>
            {notification.length ? <RedDot></RedDot> : null}
            <OverlayTrigger
              trigger='click'
              placement='bottom'
              overlay={popover}
            >
              <NotificationsIcon />
            </OverlayTrigger>
          </Noti>
        </Container>
      </Navbar>
      <ToastContainer />
    </MainContainer>
  );
};

export default Index;
