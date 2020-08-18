import { createGlobalStyle } from 'styled-components';

import Headline from '../fonts/Santander/SantanderHeadline-Regular.ttf';
import Regular from '../fonts/Santander/SantanderText-Regular.ttf';

export const theme = {
  typography: {
    family: {
      hero: 'SantanderHeadline',
      title: 'SantanderText',
      body: 'SantanderText',
    },
  },
};

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: SantanderHeadline;
    font-weight: normal;
    src: url(${Headline}) format('truetype');
  }
  @font-face {
    font-family: SantanderText;
    font-weight: normal;
    src: url(${Regular}) format('truetype');
  }
`;
