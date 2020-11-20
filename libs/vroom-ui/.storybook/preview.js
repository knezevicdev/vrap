import { addDecorator } from '@storybook/react';
import React from 'react';
import {GlobalStyle, theme} from "../src/foundation/themes/Vroom";
import {ThemeProvider} from "styled-components";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

function withGlobalStyles(storyFn) {
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {storyFn()}
      </ThemeProvider>
  );
}

addDecorator(withGlobalStyles);