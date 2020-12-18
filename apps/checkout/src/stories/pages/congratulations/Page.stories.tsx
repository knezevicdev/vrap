import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import styled, { ThemeProvider } from 'styled-components';
import { Footer, getVroomTheme, ThemeProps } from 'vroom-ui';

import Error from '../../../modules/congratulations/sections/Error';
import Loading from '../../../modules/congratulations/sections/Loading';
import Next from '../../../modules/congratulations/sections/Next';
import PurchaseSummary from '../../../modules/congratulations/sections/PurchaseSummary/PurchaseSummary';
import Questions from '../../../modules/congratulations/sections/Questions';
import ReservedCar from '../../../modules/congratulations/sections/ReservedCar';
import {
  footerViewModel,
  nextViewModel,
  purchaseSummaryViewModel,
  questionsViewModel,
  reservedCarViewModel,
} from './ViewModels';

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

export const SuccessState = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Page>
        <ReservedCar {...reservedCarViewModel} />
        <Next {...nextViewModel} />
        <PurchaseSummary {...purchaseSummaryViewModel} />
        <Questions {...questionsViewModel} />
        <Footer sections={footerViewModel.sections} />
      </Page>
    </ThemeProvider>
  );
};

export const LoadingState = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Page>
        <Loading />
        <Questions {...questionsViewModel} />
        <Footer sections={footerViewModel.sections} />
      </Page>
    </ThemeProvider>
  );
};

export const ErrorState = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Page>
        <Error />
        <Questions {...questionsViewModel} />
        <Footer sections={footerViewModel.sections} />
      </Page>
    </ThemeProvider>
  );
};

SuccessState.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=385%3A365',
  },
};

LoadingState.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=952%3A0',
  },
};

ErrorState.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=790%3A0',
  },
};

export default {
  title: 'Checkout/Congratulations/Without Trade',
  decorators: [withDesign],
};
