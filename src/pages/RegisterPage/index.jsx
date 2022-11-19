import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { isMobile, isAndroid } from 'react-device-detect';
import BottomNavbar from '../../components/mobile/BottomNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../../utils/APIRoutes';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginLink = styled(Button)`
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
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { password, username, email } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
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
    const { password, confirmPassword, username, email } = values;
    var nameRegex = /^[a-zA-Z0-9]+$/;
    if (username === '') {
      toast.error('使用者帐号不能为空', toastOptions);
      return false;
    }
    if (!username.match(nameRegex)) {
      toast.error('使用者帐号只能是数字或英文字', toastOptions);
      return false;
    } else if (username.length < 6) {
      toast.error('使用者帐号必须6位数以上', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email不能为空', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('密码不能为空', toastOptions);
      return false;
    } else if (confirmPassword === '') {
      toast.error('密码不能为空', toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error('密码必须一致', toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error('密码必须8位数以上', toastOptions);
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
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group
          className='mb-3'
          controlId='formBasicEmail'
        >
          <Form.Control
            type='email'
            name='email'
            placeholder='请输入E-mail'
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
        <Form.Group
          className='mb-3'
          controlId='formBasicPassword'
        >
          <Form.Control
            type='password'
            name='confirmPassword'
            placeholder='请确认密码'
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <LoginLink
          href='#/login'
          variant='link'
        >
          已有帐号？登入去
        </LoginLink>
        <Btn
          variant='primary'
          type='submit'
        >
          立即注册
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
