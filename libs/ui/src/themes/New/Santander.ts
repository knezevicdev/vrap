import { createGlobalStyle } from 'styled-components';

import Headline from '../fonts/Santander/SantanderHeadline-Regular.ttf';
import Regular from '../fonts/Santander/SantanderText-Regular.ttf';
import { ThemeProps } from '../types';

export const theme: ThemeProps = {
  typography: {
    family: {
      hero: 'SantanderHeadline',
      title: 'SantanderText',
      body: 'SantanderText',
    },
    color: '#041022',
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
