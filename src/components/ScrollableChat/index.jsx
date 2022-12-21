import React, { useEffect, useRef } from 'react';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../../config/ChatLogics';
import { ChatState } from '../../Context/ChatProvider';
import styled from 'styled-components';
import { alertClasses } from '@mui/material';
import { Logo } from '../../assets';

const Container = styled.div`
  margin: auto 0.2rem;
  text-align: center;
`;
const Img = styled.img`
  cursor: pointer;
`;

const Index = ({ messages }) => {
  const { user } = ChatState();
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView(true);
  }, [messages]);

  return (
    <div style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      {messages &&
        messages.map((m, i) => (
          <div
            ref={scrollRef}
            style={{ display: 'flex' }}
            key={i}
          >
            {(isSameSender(messages, m, i, user.user._id) ||
              isLastMessage(messages, i, user.user._id)) && (
              <>
                <Container>
                  {m.sender.avatarImage ? (
                    <Img
                      src={`data:image/svg+xml;base64,${m.sender.avatarImage}`}
                      alt='avatar'
                      width='35px'
                    />
                  ) : (
                    <Img
                      src={Logo}
                      alt='avatar'
                      width='35px'
                    />
                  )}

                  <p style={{ color: '#00000080' }}>{m.sender.username}</p>
                </Container>
              </>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user.user._id ? '#41b6fa' : '#5add8c'
                }`,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '50%',
                marginLeft: isSameSenderMargin(messages, m, i, user.user._id),
                marginTop: isSameUser(messages, m, i, user.user._id) ? 3 : 10,
                wordBreak: 'break-all',
              }}
            >
              {m.content}
              <p
                style={{
                  color: '#787878',
                  fontSize: '0.8rem',
                  marginTop: '0.2rem',
                }}
              >{`${new Date(m.createdAt).toLocaleString()}`}</p>
            </span>
          </div>
        ))}
    </div>
  );
};

export default Index;
