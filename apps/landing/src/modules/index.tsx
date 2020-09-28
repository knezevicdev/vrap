import React from 'react';
import styled from 'styled-components';

import Footer from '../core/Footer';
import Colors from './sections/Colors';
import Features from './sections/Features';
import { Header } from './sections/Header';
import Hero from './sections/Hero';
import { Legal } from './sections/Legal';
import Overview from './sections/Overview';

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  max-width: 864px;
  margin-left: auto;
  margin-right: auto;
`;

const Space = styled.div`
  min-height: 64px;
  max-height: 64px;
`;

const Divider = styled.div`
  display: flex;
  min-height: 1px;
  max-height: 1px;
  background-color: #d6d7da;

  @media (min-width: 840px) {
    margin: 32px auto;
  }

  @media (min-width: 600px) and (max-width: 839px) {
    margin: 32px 64px;
  }

  @media (max-width: 599px) {
    margin: 32px 24px;
  }
`;

const Landing: React.FC = () => {
  return (
    <Page>
      <Header />
      <Container>
        <Hero />
        <Divider />
        <Overview />
        <Space />
        <Colors />
        <Space />
        <Features />
        <Legal />
      </Container>
      <Footer />
    </Page>
  );
};

export default Landing;
