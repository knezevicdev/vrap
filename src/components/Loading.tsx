import React from 'react';
import styled from 'styled-components';

import { Title } from 'src/core/Typography';

interface Props {
  message?: string;
}

const Loading: React.FC<Props> = ({ message = 'Loading...' }) => {
  return (
    <Overlay>
      <Container>
        <Spinner src="assets/gifs/vroom-spinner.gif" alt={message} />
        <Message>{message}</Message>
      </Container>
    </Overlay>
  );
};

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 9999;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.5);
  min-width: 320px;

  @media (max-width: 420px) {
    padding: 16px 16px 32px 16px;
    margin: 16px 16px 32px 16px;
  }
`;

const Spinner = styled.img`
  min-width: 80px;
  max-width: 80px;
`;

const Message = styled(Title.Three)`
  color: #e7131a;
  margin-top: 16px;
  text-align: center;
`;

export default Loading;
