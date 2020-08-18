import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Body, Hero, Title } from './atoms/Typography';
import { theme as SantanderTheme } from './themes/New/Santander';
import { theme as VroomTheme } from './themes/New/Vroom';

export default { title: 'Library' };

const Container = styled.div`
  display: flex;
`;

const Client = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-right: solid 1px #d6d7da;
  padding-left: 16px;
  padding-right: 16px;
`;

const SectionTitle = styled(Title.One)`
  margin: 16px 0;
  border-bottom: solid 1px #d6d7da;
  padding-bottom: 16px;
  color: #e7131a;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Typography = (): JSX.Element => {
  return (
    <SectionContainer>
      <SectionTitle>Typography</SectionTitle>
      <Hero.One>hero h1</Hero.One>
      <Hero.Two>hero h2</Hero.Two>
      <Hero.Three>hero h3</Hero.Three>
      <Hero.Four>hero h4</Hero.Four>
      <Title.One>Title 1</Title.One>
      <Title.Two>Title 2</Title.Two>
      <Title.Three>Title 3</Title.Three>
      <Body.Regular>Body regular</Body.Regular>
      <Body.Small>Body small</Body.Small>
      <Body.Fine>Body fine</Body.Fine>
    </SectionContainer>
  );
};

export const Atoms: React.FC = () => {
  return (
    <Container>
      <Client>
        <ThemeProvider theme={VroomTheme}>
          <Typography />
        </ThemeProvider>
      </Client>
      <Client>
        <ThemeProvider theme={SantanderTheme}>
          <Typography />
        </ThemeProvider>
      </Client>
    </Container>
  );
};
