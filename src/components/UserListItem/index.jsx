import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';
import { Logo } from '../../assets';

const Container = styled.div`
  display: flex;
  cursor: pointer;
`;
const LeftContainer = styled.div``;
const RightContainer = styled.div``;
const Img = styled.img`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Index = ({ user, handleFunction }) => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item
          action
          onClick={handleFunction}
        >
          <Container>
            <LeftContainer>
              {user.avatarImage ? (
                <Img
                  src={`data:image/svg+xml;base64,${user.avatarImage}`}
                  alt=''
                />
              ) : (
                <Img
                  src={Logo}
                  alt=''
                />
              )}
            </LeftContainer>
            <RightContainer>
              <div>{user.username}</div>
              <div>{user.email}</div>
            </RightContainer>
          </Container>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Index;
