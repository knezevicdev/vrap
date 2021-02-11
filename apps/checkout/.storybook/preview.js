import { addDecorator } from '@storybook/react';
import React from 'react';
import {
  getVroomTheme,
  GlobalStyle,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { ThemeProvider } from 'styled-components';
import { withPerformance } from 'storybook-addon-performance';
import { setConfig } from 'next/config';

setConfig({
  publicRuntimeConfig: {
    VERSION: '',
    BASE_PATH: ''
  },
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: {
          width: '411px',
          height: '100%',
        },
      },
    },
  },
  layout: 'fullscreen',
};

function withGlobalStyles(storyFn) {
  const theme = getVroomTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {storyFn()}
    </ThemeProvider>
  );
}

addDecorator(withGlobalStyles);
addDecorator(withPerformance);
