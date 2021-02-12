import { ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import styled from 'styled-components';

import DealSummary from '../deals/sections/DealSummary/index';
import SelectedCar from '../deals/sections/DealSummary/SelectedCar';
import Footer from '../footer';
import Header from '../header';
import { ProgressBar } from './ProgressBar';

import { useDeal } from 'src/core/hooks';

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
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);

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

const DealSummarySection = styled.div<{ showDropdown?: boolean }>`
  background-color: ${primaryWhite};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);

  grid-column: span 4;

  position: sticky;
  top: 72px;

  @media (max-width: 1023px) {
    ${(props): string =>
      props.showDropdown
        ? `
        position: absolute;
        z-index: 2;
        top: 56px;
        left: 0;
        right: 0;
        `
        : `
        display: none;
        `}
  }
`;

interface Props {
  showCarCard: boolean;
}

const CheckoutLayout: FC<Props> = ({ showCarCard, children }) => {
  const { steps, activeStep, deal, vehicle, showDropdown } = useDeal();

  return (
    <Container>
      <Header />
      <Section>
        <TrackerSection>
          <ProgressBar steps={steps} activeStep={activeStep} />
        </TrackerSection>
        <CheckoutSection>
          <DealContent>{children}</DealContent>
          <DealSummarySection showDropdown={showDropdown}>
            {!showCarCard && <DealSummary deal={deal} />}
            {showCarCard && <SelectedCar {...vehicle} />}
          </DealSummarySection>
        </CheckoutSection>
      </Section>
      <Footer />
    </Container>
  );
};

export default observer(CheckoutLayout);
