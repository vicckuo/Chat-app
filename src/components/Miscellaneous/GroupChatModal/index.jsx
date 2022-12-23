import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatState } from '../../../Context/ChatProvider';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../../Context/contexts';
import axios from 'axios';
import { host } from '../../../utils/APIRoutes';
import UserListItem from '../../UserListItem';
import UserBadgeItem from '../../UserBadgeItem';
import styled from 'styled-components';

const UserItem = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Index = ({ children }) => {
  const toastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  };

  const isAdmin = {
    position: 'top-left',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();
  const currentUser = useContext(UserContext);

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
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      return toast.error('请填写内容', toastOptions);
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };
      const { data } = await axios.post(
        `${host}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      handleClose();
      toast.success('新群组已创建', toastOptions);
    } catch (error) {
      toast.error('群组创建失败', toastOptions);
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return toast.error('用户已新增', toastOptions);
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
      >
        创建群聊
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>创建群聊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <UserItem>
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </UserItem>
          {loading ? (
            <div>loading</div>
          ) : (
            searchResult?.slice(0, 4).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
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
            variant='primary'
            onClick={handleSubmit}
          >
            创建群聊
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
