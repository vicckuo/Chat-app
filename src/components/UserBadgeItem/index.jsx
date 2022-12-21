import React from 'react';
import Badge from 'react-bootstrap/Badge';
import CloseButton from 'react-bootstrap/CloseButton';

import styled from 'styled-components';

const Container = styled.div`
  margin: 0.2rem;
`;

const Index = ({ user, handleFunction }) => {
  return (
    <Container>
      <Badge
        onClick={handleFunction}
        bg='primary'
      >
        {user.username}
        <CloseButton />
      </Badge>
    </Container>
  );
};

export default Index;
