import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Awards } from './sections/SEM/Awards';
import { Colors } from './sections/SEM/Colors';
import { Features } from './sections/SEM/Features';
import { Hero } from './sections/SEM/Hero';
import { Overview } from './sections/SEM/Overview';
import { ProsAndCons } from './sections/SEM/ProsAndCons';
import { theme as VroomTheme } from './themes/New/Vroom';

export default { title: 'Pages' };

/*
  TODO:
  Mobile layout broken because sections are not all responsive.
  Debug by removing sections to see what needs work.
 */

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  max-width: 864px;
  align-self: center;
  padding: 36px 36px 128px 36px;
`;

const Space = styled.div`
  min-height: 64px;
  max-height: 64px;
`;

export const SEM: React.FC = () => {
  return (
    <ThemeProvider theme={VroomTheme}>
      <Page>
        <Container>
          <Hero info={{ image: '', title: '2019 wrangler', logo: '' }} />
          <Space />
          <Overview />
          <Space />
          <Colors />
          <Space />
          <Features />
          <Space />
          <ProsAndCons />
          <Space />
          <Awards />
        </Container>
      </Page>
    </ThemeProvider>
  );
};
