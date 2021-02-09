import { ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';
import { ProgressBar } from './ProgressBar';
import { DealContext } from '../store/DealStore';

const grayFour = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.four;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Container = styled.div`
  background-color: ${grayFour};
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Section = styled.section`
  max-width: 1280px;
  width: 100%;
  flex: 1;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

const TrackerSection = styled.div`
  margin: 16px 0px;
`;

const CheckoutSection = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: flex-start;
  gap: 32px;
  padding: 0 16px 24px 16px;

  @media (max-width: 800px) {
    padding: 0 0 24px 0;
  }
`;

const DealContent = styled.div`
  background-color: ${primaryWhite};
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);

  padding: 32px 96px 40px;
  grid-column: span 8;

  @media (max-width: 1023px) {
    grid-column: span 12;
  }
  @media (max-width: 800px) {
    padding: 32px 40px 40px;
  }
  @media (max-width: 600px) {
    padding: 24px;
  }
`;

const DealSummary = styled.div`
  background-color: ${primaryWhite};
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);

  padding: 32px 96px 40px;
  grid-column: span 4;

  position: sticky;
  top: 16px;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const CheckoutLayout: FC = ({ children }) => {
  const { steps, activeStep, deal } = useContext(DealContext);
  return (
    <Container>
      <Header />
      <Section>
        <TrackerSection>
          <ProgressBar steps={steps} activeStep={activeStep} />
        </TrackerSection>
        <CheckoutSection>
          <DealContent>{children}</DealContent>
          {/* Deal Summary will come here once code merged */}
          <DealSummary></DealSummary>
        </CheckoutSection>
      </Section>
      <Footer />
    </Container>
  );
};

export default CheckoutLayout;
