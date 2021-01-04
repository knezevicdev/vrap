import React from 'react';
import styled from 'styled-components';
import { addStyleForMobile, Body, Heading, Link, ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';

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
  text-align: center;
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

const Message = styled.div`
  margin-top: 16px;
  padding: 0 24px;
`;

const CustomLink = styled(Link)`
  color: ${primaryBrand};
  font-weight: 600;
`;

const Error: React.FC = (): JSX.Element => {
  return (
    <Background>
      <Container>
        <Heading.Two>Sorry, something went wrong.</Heading.Two>
        <Message>
          <Body.Regular>
            Please try refreshing this page or checking out{' '}
          </Body.Regular>
          <CustomLink href="https://www.vroom.com/my-account">
            your account.
          </CustomLink>
        </Message>
      </Container>
    </Background>
  );
};

export default Error;
