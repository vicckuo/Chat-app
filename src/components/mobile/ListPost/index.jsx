import styled from 'styled-components';

const Container = styled.div`
  color: white;
`;
const Ul = styled.ul`
  list-style: none;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  margin: auto 15px;
  padding: 15px;
`;
const List = styled.li`
  color: rgb(161, 197, 219);
  margin: auto;
  padding: 0.5rem 0;
  &::before {
    content: '•';
    color: rgb(161, 197, 219);
    bottom: 2px;
    position: relative;
  }
`;

const Index = () => {
  return (
    <Container>
      <Ul>
        <List>公告1公告1公告1公告1公告1公告1</List>
        <List>公告2公告2公告2公告2公告2公告2</List>
        <List>公告3公告3公告3公告3公告3公告3</List>
        <List>公告4公告4公告4公告4公告4公告4</List>
      </Ul>
    </Container>
  );
};

export default Index;
