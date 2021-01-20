import React from 'react';
import styled from 'styled-components';
import { Hero } from 'src/core/Typography';

const Background = styled.div`
  display: flex;
  background: linear-gradient(#E7131A 70%, #FFFFFF 30%);
  justify-content: center;
  position: absolute;
  z-index: 2;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1082px;
  height: 416px;
  align-items: center;
  justify-content: center;
  padding: 48px;
  margin: 64px;
  box-shadow: 0px 4px 24px 4px rgba(0, 0, 0, 0.1);
  background: #FFFFFF;

  @media (max-width: 420px) {
    padding: 16px 16px 32px 16px;
    margin: 16px 16px 32px 16px;
  }
`;

const Spinner = styled.img`
  min-width: 80px;
  max-width: 80px;
`;

const Message = styled(Hero.Four)`
  color: '#E7131A';
  margin-top: 16px;
`;

const Loading: React.FC = (): JSX.Element => {
  return (
    <Background>
      <Container>
        <Spinner src="assets/gifs/vroom-spinner.gif" alt="Loading..." />
        <Message>loading...</Message>
      </Container>
    </Background>
  );
};

export default Loading;
