import React from 'react';
import styled from 'styled-components';

import { Colors } from './sections/Colors';
import { Hero } from './sections/Hero';

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

// const Space = styled.div`
//   min-height: 64px;
//   max-height: 64px;
// `;

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
      <Container>
        <Hero />
        <Divider />
        <Colors />
      </Container>
    </Page>
  );
};

export default Landing;
