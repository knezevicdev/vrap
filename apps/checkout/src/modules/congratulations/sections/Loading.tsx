import React from 'react';
import styled from 'styled-components';
import { addStyleForMobile, Heading, ThemeProps } from 'vroom-ui';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Background = styled.div`
  display: flex;
  background: linear-gradient(${primaryBrand} 70%, ${primaryWhite} 30%);
  justify-content: center;
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
  background: ${primaryWhite};

  ${addStyleForMobile(`
        padding: 16px 16px 32px 16px;
        margin: 16px 16px 32px 16px;
   `)}
`;

const Spinner = styled.img`
  min-width: 80px;
  max-width: 80px;
`;

const Message = styled(Heading.Four)`
  color: ${primaryBrand};
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
