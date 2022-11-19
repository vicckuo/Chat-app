import styled from "styled-components";

const Container = styled.div`
    color: white;
`
const Ul = styled.ul`
    list-style: none;
    background: rgba(0,0,0,0.4);
    border-radius: 0.5rem;
    margin: auto 15px;
    padding: 15px;

`
const List = styled.li`
    color: rgb(161, 197, 219);
    margin: auto;
    padding: 0.5rem 0;
    &::before{
        content: "•"; color: rgb(161, 197, 219);
        bottom: 2px;
        position: relative;
    }
`

const Index = () => {
    return (
        <Container>
            <Ul>
                <List>『周存周周送』现回馈，彩金派送享不完！</List>
                <List>『介绍新户即送』首充金额10%回馈！</List>
                <List>『技术服务时段』周二至日下午13:00-23:00</List>
                <List>『联系您的专属导师』首充即送好礼！</List>
            </Ul>
        </Container>
    );
}

export default Index;
