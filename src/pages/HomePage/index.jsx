import Header from '../../components/Header';
import Slider from '../../components/Slider';
import Announcement from '../../components/Announcement';
import Feature from '../../components/Feature';
import Downloader from '../../components/Downloader';
import Services from '../../components/Services';
import Footer from '../../components/Footer';
import Category from '../../components/mobile/Category';
import ListPost from '../../components/mobile/ListPost';
import BottomNavbar from '../../components/mobile/BottomNavbar';
import { isMobile, isAndroid } from 'react-device-detect';
import styled from 'styled-components';
import { UserContext } from '../../contexts';
import { useContext } from 'react';

const Container = styled.div``;

const Index = () => {
  const currentUser = useContext(UserContext);

  return (
    <UserContext.Provider value={currentUser}>
      <Container>
        <Header />
        <Slider />
        <Announcement />
        <Feature />
        <Downloader />
        <Services />
        <Footer />
        {(isMobile || isAndroid) && (
          // MOBILE
          <>
            <Category />
            <ListPost />
            <BottomNavbar />
          </>
        )}
      </Container>
    </UserContext.Provider>
  );
};

export default Index;
