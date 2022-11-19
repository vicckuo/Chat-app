import Header from '../../../components/Header';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { isMobile, isAndroid } from 'react-device-detect';
import BottomNavbar from '../../../components/mobile/BottomNavbar';
import TopBackNavBar from '../../../components/mobile/TopBackNavBar';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../../Services/AuthService';
import axios from 'axios';
import { host } from '../../../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  margin: 15px auto;
  padding: 0 15px;
`;

const Title = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 1.125rem 0;
  background: transparent linear-gradient(180deg, #8ee4ff 0%, #3495ff 100%) 0%
    0% no-repeat;
  border-radius: 0.5rem;
`;

const Content = styled.div`
  background-color: #12436d;
  border-radius: 0.5rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  padding: 1.125rem 1rem;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const InputForm = styled.div`
  margin: auto 15px;
  flex: 1;
`;

const Btn = styled(Button)``;

const Submit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
`;

const Back = styled(Link)`
  display: flex;
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
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { password, currentPassword, confirmPassword } = values;
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.put(
        `${host}/api/auth/updatepw/${user.user._id}`,
        {
          password,
          currentPassword,
          confirmPassword,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        toast.success(data.msg, toastOptions);
      }
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <>
      {AuthService.isLogin() ? (
        <>
          <Header />
          <Container>
            <TopBackNavBar />
            <Card>
              <Title>修改密码</Title>
              <Form
                action=''
                onSubmit={(e) => handleSubmit(e)}
              >
                <Content>
                  <Info>
                    <Text>当前密码</Text>
                    <InputForm>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicEmail'
                      >
                        <Form.Control
                          type='password'
                          name='currentPassword'
                          placeholder='当前密码'
                          onChange={(e) => handleChange(e)}
                        />
                      </Form.Group>
                    </InputForm>
                  </Info>
                  <Info>
                    <Text>新密码&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <InputForm>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicPassword'
                      >
                        <Form.Control
                          type='password'
                          name='password'
                          placeholder='新密码'
                          onChange={(e) => handleChange(e)}
                        />
                      </Form.Group>
                    </InputForm>
                  </Info>
                  <Info>
                    <Text>确认密码</Text>
                    <InputForm>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      >
                        <Form.Control
                          type='password'
                          name='confirmPassword'
                          placeholder='确认密码'
                          onChange={(e) => handleChange(e)}
                        />
                      </Form.Group>
                    </InputForm>
                  </Info>
                  <Submit>
                    <Btn
                      variant='primary'
                      type='submit'
                    >
                      送出
                    </Btn>
                  </Submit>
                </Content>
              </Form>
            </Card>
            <Back to={-1}>
              <Btn
                variant='secondary'
                type='submit'
              >
                返回
              </Btn>
            </Back>

            {(isMobile || isAndroid) && (
              // MOBILE
              <>
                <BottomNavbar />
              </>
            )}
            <ToastContainer />
          </Container>
        </>
      ) : null}
    </>
  );
};

export default Index;
