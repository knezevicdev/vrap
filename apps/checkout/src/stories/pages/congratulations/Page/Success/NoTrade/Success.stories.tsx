import {
  Footer,
  getVroomTheme,
  ThemeProps,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
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
  reservedCarViewModel,
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

export const SuccessStateWithoutTrade = (): JSX.Element => {
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

SuccessStateWithoutTrade.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=385%3A365',
  },
};

export default {
  title: 'Checkout/Congratulations/Page/No Trade',
  decorators: [withDesign],
};
