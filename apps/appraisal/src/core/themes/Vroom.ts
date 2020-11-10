import getConfig from 'next/config';
import { createGlobalStyle } from 'styled-components';
const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

export interface ThemeProps {
  typography: {
    family: {
      hero: string;
      title: string;
      body: string;
    };
    color: string;
  };
}

export const theme: ThemeProps = {
  typography: {
    family: {
      hero: 'Vroom Sans',
      title: 'Calibre',
      body: 'Calibre',
    },
    color: '#041022',
  },
};

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    margin: 0;
    height: 100%;
  }
  
  #__next {
    height: 100%;
  }

  @font-face {
    font-family: Calibre;
    font-weight: normal;
    src: url(${BASE_PATH}/fonts/Vroom/Calibre-Regular.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Calibre;
    font-weight: 600;
    src: url(${BASE_PATH}/fonts/Vroom/Calibre-Semibold.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Vroom Sans;
    font-weight: normal;
    src: url(${BASE_PATH}/fonts/Vroom/Vroom-Sans.woff2) format('woff2');
    font-display: swap;
  }
`;
