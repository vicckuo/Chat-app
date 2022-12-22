import React, { useContext, useEffect, useState, useRef } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import UpdateGroupChatModal from '../Miscellaneous/UpdateGroupChatModal';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../Context/contexts';
import { host } from '../../utils/APIRoutes';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollableChat from '../ScrollableChat';
import ProfileModal from '../Miscellaneous/ProfileModal';
import SendIcon from '@mui/icons-material/Send';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Robot from '../../assets/images/robot.gif';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
`;

const Text = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Btn = styled(Button)``;
const Back = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #e8e8e8;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  overflow-y: hidden;
  .messages {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0.5rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
`;

const Spn = styled(Spinner)`
  align-items: center;
  margin: auto;
`;

const Index = ({ fetchAgain, setFetchAgain }) => {
  const toastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  };

  const socket = useRef();
  const selectedChatCompare = useRef();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const currentUser = useContext(UserContext);

  useEffect(() => {
    socket.current = io(host);
    socket.current.emit('setup', user);

    socket.current.on('connected', () => {
      setSocketConnected(true);
    });
    socket.current.on('typing', () => setIsTyping(true));
    socket.current.on('stop typing', () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.current.on('message recieved', (newMessageRecived) => {
      if (
        !selectedChatCompare.current ||
        selectedChatCompare.current._id !== newMessageRecived.chat._id
      ) {
        //给通知
        if (!notification.includes(newMessageRecived)) {
          setNotification([newMessageRecived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecived]);
      }
    });
  });

  useEffect(() => {
    fetchMessages();
    selectedChatCompare.current = selectedChat;
    // console.log(selectedChatCompare.current);
  }, [selectedChat]);

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `${host}/api/message/${selectedChat._id}`,
        config
      );
      // console.log(messages);
      setMessages(data);
      setLoading(false);
      socket.current.emit('join chat', selectedChat._id);
    } catch (error) {
      console.log(error);
      return toast.error('获取訊息失败', toastOptions);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;
    socket.current.emit('stop typing', selectedChat._id);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      setNewMessage('');

      const { data } = await axios.post(
        `${host}/api/message`,
        { content: newMessage, chatId: selectedChat._id },
        config
      );

      // console.log(data);
      socket.current.emit('new message', data);

      setMessages([...messages, data]);
    } catch (error) {
      return toast.error('传送讯息失败', toastOptions);
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // 打字中
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.current.emit('typing', selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.current.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text>
            <ArrowBackIcon
              styled={{ display: 'flex' }}
              onClick={() => setSelectedChat('')}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </>
              ))}
          </Text>
          <Box>
            {loading ? (
              <Spn
                animation='border'
                role='status'
              >
                <span className='visually-hidden'>Loading...</span>
              </Spn>
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )}

            <Form onSubmit={sendMessage}>
              {isTyping ? <div>对方正在输入讯息中...</div> : <></>}
              <InputGroup className='mb-0'>
                <Form.Control
                  placeholder='请输入讯息...'
                  aria-label='请输入讯息...'
                  aria-describedby='basic-addon2'
                  value={newMessage}
                  onChange={typingHandler}
                />
                <Button
                  variant='outline-secondary'
                  id='button-addon2'
                  type='submit'
                >
                  <SendIcon />
                </Button>
              </InputGroup>
            </Form>
          </Box>
        </>
      ) : (
        <>
          <Container>
            <img
              src={Robot}
              alt={Robot}
            />
            <h1>
              您好,{' '}
              <span>
                {user.user.nickname ? user.user.nickname : user.user.username}
              </span>
            </h1>
            <h3>请选择您的专属导师进行聊天。</h3>
            <Back to={-1}>
              <Btn
                variant='secondary'
                type='submit'
              >
                返回
              </Btn>
            </Back>
          </Container>
        </>
      )}
    </>
  );
};

export default Index;
