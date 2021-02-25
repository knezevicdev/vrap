import {
  Footer,
  getVroomTheme,
  ThemeProps,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import styled, { ThemeProvider } from 'styled-components';

import Error from 'src/modules/congratulations/sections/Error';
import Questions from 'src/modules/congratulations/sections/Questions';
import { footerViewModel, questionsViewModel } from '../ViewModels';

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

ErrorState.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=790%3A0',
  },
};

export default {
  title: 'Checkout/Congratulations/Page',
  decorators: [withDesign],
};
