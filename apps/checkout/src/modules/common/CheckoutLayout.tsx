import { ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import DealSummary from '../deals/sections/DealSummary/index';
import { DealContext } from '../store/DealStore';
import { ProgressBar } from './ProgressBar';

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

const Footer = styled.footer`
  height: 72px;
  background-color: rgb(4, 16, 34);
`;

const Header = styled.header`
  height: 72px;
  background-color: #fff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1;
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
  margin: 0 16px 24px 16px;

  @media (max-width: 1280px) {
    gap: 16px;
  }
  @media (max-width: 600px) {
    margin: 0 0 24px 0;
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

const DealSummarySection = styled.div`
  background-color: ${primaryWhite};
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);

  grid-column: span 4;

  position: sticky;
  top: 72px;

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
          <DealSummarySection>
            {deal && <DealSummary deal={deal} />}
            {/* {<SelectedCar {...vehicle} />} */}
          </DealSummarySection>
        </CheckoutSection>
      </Section>
      <Footer />
    </Container>
  );
};

export default CheckoutLayout;
