import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import { UserContext } from '../../../Context/contexts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Title = styled(Modal.Title)`
  font-size: 30px;
`;

const Img = styled.img`
  display: flex;
  margin: auto;
  width: 250px;
`;
const Text = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 30px;
`;

const Index = ({ user }) => {
  const toastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currentUser = useContext(UserContext);

  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
      >
        个人档案
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Title>{user.username}</Title>
        </Modal.Header>
        <Modal.Body>
          <Img
            src={`data:image/svg+xml;base64,${user.avatarImage}`}
            alt='avatar'
          />
          <div>
            <Text>Email: {user.email}</Text>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}
          >
            返回
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
