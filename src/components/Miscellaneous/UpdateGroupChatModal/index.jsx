import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatState } from '../../../Context/ChatProvider';
import UserBadgeItem from '../../UserBadgeItem';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { UserContext } from '../../../Context/contexts';
import axios from 'axios';
import { host } from '../../../utils/APIRoutes';
import ChatLoading from '../ChatLoading';
import UserListItem from '../../UserListItem';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Index = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const toastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  };

  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const currentUser = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddUser = async (user1) => {
    if (selectedChat.groupAdmin._id !== currentUser.user._id) {
      return toast.error('只有群组管理员才能添加', toastOptions);
    }
    if (selectedChat.users.find((u) => u._id === user1)) {
      return toast.error('用户已在群组里', toastOptions);
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      const { data } = await axios.put(
        `${host}/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast.error('发生错误', toastOptions);
    }
  };
  const handleRemove = async (user1) => {
    console.log('user1.user._id', user1._id);
    console.log('currentUser.user._id', currentUser.user._id);
    if (
      selectedChat.groupAdmin._id !== currentUser.user._id &&
      user1._id !== currentUser.user._id
    )
      return toast.error('只有管理员才能移除成员', toastOptions);

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      const { data } = await axios.put(
        `${host}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === currentUser.user._id
        ? setSelectedChat()
        : setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error('发生错误', toastOptions);
    }
  };
  const handleLeave = async (user1) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      const { data } = await axios.put(
        `${host}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1.user._id,
        },
        config
      );
      user1.user._id === currentUser.user._id
        ? setSelectedChat()
        : setSelectedChat(data);

      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error('发生错误', toastOptions);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };

      const { data } = await axios.put(
        `${host}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      setRenameLoading(false);
      setGroupChatName('');
      return toast.error('发生错误', toastOptions);
    }
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      return toast.error('查询结果失败', toastOptions);
    }
  };

  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
      >
        成员
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedChat.chatName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </Container>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput1'
            >
              <Form.Label>群组名称</Form.Label>
              <Form.Control
                placeholder='群组名称'
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant='primary'
                onClick={handleRename}
                isloading={renameloading.toString()}
              >
                更新
              </Button>
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput1'
            >
              <Form.Label>新增用户</Form.Label>
              <Form.Control
                placeholder='输入用户名'
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Form.Group>
          </Form>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.slice(0, 4).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user._id)}
              />
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}
          >
            返回
          </Button>
          <Button
            variant='danger'
            onClick={() => handleLeave(user)}
          >
            离开群组
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
