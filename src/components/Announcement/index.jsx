import Marquee from 'react-fast-marquee';
import CampaignIcon from '@mui/icons-material/Campaign';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: #101434;
  color: white;
  padding: 10px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

const Index = () => {
  return (
    <Container>
      <CampaignIcon fontSize='large' />
      <Marquee
        gradient={false}
        speed={100}
      >
        我是一条公告消息
      </Marquee>
    </Container>
  );
};

export default Index;
