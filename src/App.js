import { UserContext } from '../src/Context/contexts';
import { useContext } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from './pages/EditProfilePage';
import EditPasswordPage from './pages/EditProfilePage/EditPasswordPage';
import ChatPage from './pages/ChatPage';
import EmailVerification from './components/EmailVerification';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Agent from './pages/mobile/Agent';
import WebPlatform from './pages/mobile/WebPlatform';
import Member from './pages/mobile/Member';
import { isMobile, isAndroid } from 'react-device-detect';
import ChatProvider, { ChatState } from './Context/ChatProvider';
import SetAvatarPage from './pages/SetAvatarPage';

function App() {
  const currentUser = useContext(UserContext);
  const user = useContext(ChatState);
  return (
    <ChatProvider value={user}>
      <UserContext.Provider value={currentUser}>
        <Router>
          <Routes>
            <Route
              exact
              path='/'
              element={<HomePage />}
            ></Route>
            <Route
              path='/login'
              element={<LoginPage />}
            ></Route>
            <Route
              path='/register'
              element={<RegisterPage />}
            ></Route>
            <Route
              path='/editprofile'
              element={<EditProfilePage />}
            ></Route>
            <Route
              path='/editpw'
              element={<EditPasswordPage />}
            ></Route>
            <Route
              path='/verifyUserEmail/:username/:token'
              element={<EmailVerification />}
            ></Route>
            <Route
              path='/setAvatar'
              element={<SetAvatarPage />}
            />
            <Route
              path='/chats'
              element={<ChatPage />}
            ></Route>
            {(isMobile || isAndroid) && (
              // MOBILE
              <>
                <Route
                  path='/agent'
                  element={<Agent />}
                ></Route>
                <Route
                  path='/webplatform'
                  element={<WebPlatform />}
                ></Route>
                <Route
                  path='/member'
                  element={<Member />}
                ></Route>
              </>
            )}
          </Routes>
        </Router>
      </UserContext.Provider>
    </ChatProvider>
  );
}

export default App;
