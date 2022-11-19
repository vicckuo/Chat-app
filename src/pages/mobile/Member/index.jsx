import styled from 'styled-components';
import BottomNavbar from '../../../components/mobile/BottomNavbar';
import { Logo } from '../../../assets';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../../contexts';
import { useContext } from 'react';
import AuthService from '../../../Services/AuthService';

const Container = styled.div`
  color: white;
`;
const TopContainer = styled.div`
  display: flex;
  padding: 50px;
  align-items: center;
  position: relative;
`;
const Img = styled.img`
  width: 20%;
  border-radius: 50%;
  background-color: #0e4160;
  align-items: center;
  justify-content: center;
`;
const MemberStatus = styled.div`
  width: 80%;
  margin-left: 0.75rem;
`;

const Btn = styled(Button)`
  border-radius: 1rem;
  border: none;
`;

const Index = () => {
  const currentUser = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem('chat-app-user');
    window.location.reload();
  };
  return (
    <Container>
      <TopContainer>
        <Img src={Logo}></Img>
        <MemberStatus>
          {AuthService.isLogin() && (
            <div>您好，{currentUser.user.username}</div>
          )}
          {!AuthService.isLogin() && <div>尚未登入</div>}

          {AuthService.isLogin() && (
            //如果已登入
            <>
              <Btn
                href='#/editprofile'
                variant='primary'
                size='sm'
              >
                编辑资料
              </Btn>{' '}
              <Btn
                onClick={handleLogout}
                variant='primary'
                size='sm'
              >
                登出
              </Btn>
            </>
          )}
          {!AuthService.isLogin() && (
            //如果已登出
            <Btn
              href='#/login'
              variant='primary'
              size='sm'
            >
              注册 / 登入
            </Btn>
          )}
        </MemberStatus>
      </TopContainer>
      <BottomNavbar />
    </Container>
  );
};

export default Index;
