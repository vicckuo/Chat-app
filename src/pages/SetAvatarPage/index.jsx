import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loader from '../../assets/images/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../../utils/APIRoutes';
import { Buffer } from 'buffer';
import BottomNavbar from '../../components/mobile/BottomNavbar';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* gap: 3rem; */
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  padding-bottom: 50px;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #774af4;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
      transition: 0.5s ease-in-out;
    }
  }
`;

const Index = () => {
  const api = 'https://api.multiavatar.com';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: 'top-center',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  //判断未登入使用者，重定向至登入页
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('请选择一个头像', toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user.user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        try {
          alert('头像设置成功，将重定向至首页');
          user.user.isAvatarImageSet = true;
          user.user.avatarImage = data.image;
          localStorage.setItem('chat-app-user', JSON.stringify(user));
          navigate('/');
        } catch (error) {
          toast.error('头像设置出错,请重新试一次', toastOptions);
        }
      } else {
        toast.error('头像设置出错,请重新试一次', toastOptions);
      }
    }
  };
  useEffect(() => {
    async function check() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    check();
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img
            src={loader}
            alt='loader'
            className='loader'
          />
        </Container>
      ) : (
        <Container>
          <div className='title-container'>
            <h1>选一个照片做为头像</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt='avatar'
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className='submit-btn'
            onClick={setProfilePicture}
          >
            设置头像
          </button>
        </Container>
      )}
      <ToastContainer />
      <BottomNavbar />
    </>
  );
};

export default Index;
