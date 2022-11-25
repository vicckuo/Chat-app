import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Info = styled.div``;

const Text = styled.h2`
  color: #a1c5db;
  display: flex;
  margin: 15px auto;
  align-items: center;
  justify-content: center;
`;

const Btn = styled(Button)`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
`;

const Index = () => {
  const toastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  const handleClickToHome = () => {
    navigate('/');
  };

  let { username, token } = useParams();

  const [isValidToken, setIsValidToken] = useState(false);

  async function verifyEmailToken(username, emailToken) {
    try {
      const { data } = await axios.post(
        'http://localhost:8899/api/auth/verifyEmailToken',
        { username: username, emailToken: emailToken }
      );

      if (data.status === false) {
        return toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        toast.success(data.msg, toastOptions);
        localStorage.removeItem('chat-app-user');
        return setIsValidToken(true);
      }
    } catch (error) {
      return toast.error('认证失败', toastOptions);
    }
  }
  useEffect(() => {
    verifyEmailToken(username, token);
  }, []);

  return (
    <Container>
      {isValidToken ? (
        <>
          <Info>
            <Text>Email已完成验证</Text>
            <Btn onClick={handleClick}>登入</Btn>
          </Info>
          <ToastContainer />
        </>
      ) : (
        <>
          <Info>
            <Text>验证失败</Text>
            <Btn onClick={handleClickToHome}>回首页</Btn>
          </Info>
          <ToastContainer />
        </>
      )}
    </Container>
  );
};

export default Index;
