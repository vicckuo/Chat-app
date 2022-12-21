import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { isMobile, isAndroid } from 'react-device-detect';
import BottomNavbar from '../../components/mobile/BottomNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../../utils/APIRoutes';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegisterLink = styled(Button)`
  color: #a1c5db;
  display: flex;
  margin: 15px auto;
  align-items: center;
  justify-content: center;
`;

const Btn = styled(Button)`
  width: 50%;
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

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { password, username } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data));
          window.location.reload();
        }
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        return toast.error('网路连接异常', toastOptions);
      }
      toast.error(error.message, toastOptions);
    }
  };

  const handleValidation = () => {
    const { password, username } = values;
    if (password === '') {
      toast.error('帐号密码不能为空', toastOptions);
      return false;
    } else if (username === '') {
      toast.error('帐号密码不能为空', toastOptions);
      return false;
    }
    return true;
  };

  return (
    <Container>
      <Form
        action=''
        onSubmit={(e) => handleSubmit(e)}
      >
        <Form.Group
          className='mb-3'
          controlId='text'
        >
          <Form.Control
            type='text'
            name='username'
            placeholder='请输入帐号'
            min='6'
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group
          className='mb-3'
          controlId='formBasicPassword'
        >
          <Form.Control
            type='password'
            name='password'
            placeholder='请输入密码'
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <RegisterLink
          href='#/register'
          variant='link'
        >
          还没有帐号？注册去
        </RegisterLink>
        <Btn
          variant='primary'
          type='submit'
        >
          立即登入
        </Btn>
        <br />
        <Btn
          href='#/'
          variant='secondary'
          type='submit'
        >
          先去逛逛
        </Btn>
      </Form>
      {(isMobile || isAndroid) && (
        // MOBILE
        <>
          <BottomNavbar />
        </>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Index;
