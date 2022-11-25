import Header from '../../components/Header';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { isMobile, isAndroid } from 'react-device-detect';
import BottomNavbar from '../../components/mobile/BottomNavbar';
import TopBackNavBar from '../../components/mobile/TopBackNavBar';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../../Services/AuthService';
import axios from 'axios';
import { host, profileVerifyEmailRoute } from '../../utils/APIRoutes';
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
  padding: 1.125rem 1rem;
`;

const TextTitle = styled.label`
  margin: auto 10px;
`;

const Text = styled.p`
  margin: auto 10px;
`;
const VerifyText = styled.p`
  margin: auto 10px;
  color: #21c821;
`;

const Btn = styled(Button)``;

const VerifyLink = styled(Link)`
  color: #ff4848;
  &:hover {
    color: red;
  }
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
  const currentUser = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    nickname: '',
  });

  const hanldeClickVerifyEmail = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const username = user.user.username;
      const email = user.user.email;
      const { data } = await axios.post(
        profileVerifyEmailRoute,
        {
          username,
          email,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (data.status === true) {
        // window.location.reload();
        toast.success(data.msg, toastOptions);
      }
    } catch (error) {
      toast.error(error.response.data, toastOptions);
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { nickname } = values;
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.put(
        `${host}/api/auth/update/${user.user._id}`,
        {
          nickname,
        },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (data.status === true) {
        // window.location.reload();
        toast.success(data.msg, toastOptions);
        handleClose();
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
              <Title>帐户资讯</Title>
              <Content>
                <Info>
                  <TextTitle>昵称</TextTitle>
                  <Text>{currentUser.user.nickname}</Text>
                  <Btn
                    variant='primary'
                    onClick={handleShow}
                  >
                    修改昵称
                  </Btn>
                </Info>
                <Info>
                  <TextTitle>使用者帐号</TextTitle>
                  <Text>{currentUser.user.username}</Text>
                </Info>
                <Info>
                  <TextTitle>密码</TextTitle>
                  <Text></Text>
                  <Btn
                    href='#/editpw'
                    variant='primary'
                  >
                    修改密码
                  </Btn>
                </Info>
                <Info>
                  <TextTitle>Email</TextTitle>
                  <Text>{currentUser.user.email}</Text>
                  {currentUser.user.confirmedEmail === false ? (
                    <VerifyLink onClick={hanldeClickVerifyEmail}>
                      (未验证)
                    </VerifyLink>
                  ) : (
                    <VerifyText>(已验证)</VerifyText>
                  )}
                </Info>
              </Content>
            </Card>
            <Back to={-1}>
              <Btn
                variant='secondary'
                type='submit'
              >
                返回
              </Btn>
            </Back>

            {/* 修改昵称 */}
            <Modal
              show={show}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>修改昵称</Modal.Title>
              </Modal.Header>
              <Form
                action=''
                onSubmit={(e) => handleSubmit(e)}
              >
                <Modal.Body>
                  <Form.Group
                    className='mb-3'
                    controlId='text'
                  >
                    <Form.Control
                      type='text'
                      name='nickname'
                      placeholder='请输入昵称'
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Btn
                    variant='secondary'
                    onClick={handleClose}
                  >
                    取消
                  </Btn>
                  <Btn
                    variant='primary'
                    type='submit'
                  >
                    提交
                  </Btn>
                </Modal.Footer>
              </Form>
            </Modal>

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
