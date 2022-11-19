import { Link } from "react-router-dom"
import styled from "styled-components";
import ReplyIcon from '@mui/icons-material/Reply';
import { isMobile, isAndroid } from 'react-device-detect'

const Container = styled.div`
    width: 100%;
    height: 7vh;
    display: flex;
    background-color: #101434;
    color: white;
    align-items: center;
    justify-content: center;
    z-index: 999;
`
const LeftContainer = styled.div`
    flex: 1;
`

const Back = styled(Link)`
    color: white;
`

const Icon = styled(ReplyIcon)`
    margin-left: 10px;
`

const CenterContainer = styled.div`
    flex: 1;
`

const Text = styled.h1`
    font-size: 24px;
    text-align: center;
    margin: auto;
`

const RightContainer = styled.div`
    flex: 1;

`

const Index = () => {

    return (
        <>
            {(isMobile || isAndroid) && (
                // MOBILE
                <Container>
                    <LeftContainer>
                        <Back to={-1}>
                            <Icon fontSize="large" />
                        </Back>
                    </LeftContainer>
                    <CenterContainer>
                        <Text>
                        </Text>
                    </CenterContainer>
                    <RightContainer>

                    </RightContainer>
                </Container>
            )}
        </>
    );
}

export default Index;
