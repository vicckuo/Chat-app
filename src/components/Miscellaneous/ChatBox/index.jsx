import React from 'react';
import { ChatState } from '../../../Context/ChatProvider';
import SingleChat from '../../SingleChat';
import styled from 'styled-components';
import { iPhoneSE, mobile } from '../../../responsive';

const Container = styled.div`
  display: flex;
  ${mobile({
    margin: '0.5rem auto',
    height: '82vh',
    display: (props) => props.dis,
  })}
  ${iPhoneSE({
    height: '80vh',
  })}
`;

const index = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Container
      dis={selectedChat ? 'flex' : 'none'}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        background: 'gray',
        padding: '3px',
        width: '100%',
        borderRadius: '1rem',
        borderWidth: '1px',
      }}
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      />
    </Container>
  );
};

export default index;
