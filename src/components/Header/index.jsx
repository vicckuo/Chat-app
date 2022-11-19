import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { mobile } from '../../responsive';
import { Logo } from '../../assets';
import { UserContext } from '../../contexts';
import { useContext } from 'react';
import AuthService from '../../Services/AuthService';
import './index.css';

const MainContainer = styled.div`
  ${mobile({ display: 'none' })}
`;

const Index = () => {
  const currentUser = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem('chat-app-user');
    window.location.reload();
  };

  return (
    <MainContainer>
      <Navbar
        className='color-nav'
        bg='dark'
        variant='dark'
        expand='lg'
      >
        <Container>
          <Navbar.Brand
            className='color-nav-text'
            href='#/'
          >
            <img
              src={Logo}
              alt=''
              width='78px;'
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav className='justify-content-end'>
              {AuthService.isLogin() && (
                //如果已登入
                <>
                  <NavDropdown
                    title={`您好，${currentUser.user.username}`}
                    id='basic-nav-dropdown'
                  >
                    <NavDropdown.Item href='#/editprofile'>
                      编辑资料
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      登出
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {!AuthService.isLogin() && (
                //如果已登出
                <>
                  <Nav.Link
                    className='color-nav-text'
                    href='#/register'
                  >
                    注册
                  </Nav.Link>
                  <Nav.Link
                    className='color-nav-text'
                    href='#/login'
                  >
                    登入
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </MainContainer>
  );
};

export default Index;
