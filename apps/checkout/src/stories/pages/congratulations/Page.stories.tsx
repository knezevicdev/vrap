import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import styled, { ThemeProvider } from 'styled-components';
import { Footer, getVroomTheme } from 'vroom-ui';

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

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const theme = getVroomTheme();

export const WithoutTrade = (): JSX.Element => {
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

WithoutTrade.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=385%3A365',
  },
};

export default {
  title: 'Checkout/Congratulations/Without Trade',
  decorators: [withDesign],
};
