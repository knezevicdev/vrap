import {
  Footer,
  getVroomTheme,
  ThemeProps,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Next from 'src/modules/congratulations/sections/Next';
import PurchaseSummary from 'src/modules/congratulations/sections/PurchaseSummary/PurchaseSummary';
import Questions from 'src/modules/congratulations/sections/Questions';
import ReservedCar from 'src/modules/congratulations/sections/ReservedCar';
import {
  footerViewModel,
  nextViewModel,
  purchaseSummaryViewModel,
  questionsViewModel,
  reservedCarViewModelHasTradeIn,
  reservedCarViewModelHasTradeInDocUploadStepDone,
} from '../../../ViewModels';

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  background: ${primaryWhite};
`;

const theme = getVroomTheme();

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Page>
      {children}
      <Next {...nextViewModel} />
      <PurchaseSummary {...purchaseSummaryViewModel} />
      <Questions {...questionsViewModel} />
      <Footer sections={footerViewModel.sections} />
    </Page>
  </ThemeProvider>
);

export const WithTradeAndDocUploadStepDone = (): JSX.Element => {
  return (
    <PageLayout>
      <ReservedCar {...reservedCarViewModelHasTradeInDocUploadStepDone} />
    </PageLayout>
  );
};

export const WithTradeAndDocUploadStepNotDone = (): JSX.Element => {
  return (
    <PageLayout>
      <ReservedCar {...reservedCarViewModelHasTradeIn} />
    </PageLayout>
  );
};

export default {
  title: 'Checkout/Congratulations/Page/With Trade',
};
