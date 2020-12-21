import { createGlobalStyle, css } from 'styled-components';

import { ThemeProps } from './types';

export const getVroomTheme = (): ThemeProps => {
  return {
    typography: {
      family: {
        heading: 'Vroom Sans',
        title: 'Calibre',
        body: 'Calibre',
      },
      color: '#041022',
    },
    colors: {
      primary: {
        brand: '#E7131A',
        black: '#041022',
        white: '#FFFFFF',
      },
      secondary: {
        brand: '#1960D0',
        success: '#308406',
        error: '#F26900',
        warning: '#FFD400',
      },
      gray: {
        one: '#6C717A',
        two: '#999DA3',
        three: '#D6D7DA',
        four: '#F5F5F5',
      },
    },
  };
};

export const addStyleForMobile = (injectedCss: string) => {
  return css`
    @media (max-width: 599px) {
      ${injectedCss}
    }
  `;
};

export const addStyleForTablet = (injectedCss: string) => {
  return css`
    @media (min-width: 600px) and (max-width: 959px) {
      ${injectedCss}
    }
  `;
};

export const addStyleForDesktop = (injectedCss: string) => {
  return css`
    @media (min-width: 960px) {
      ${injectedCss}
    }
  `;
};

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    margin: 0;
    height: 100%;
  }
  
  @font-face {
    font-family: Calibre;
    font-weight: normal;
    src: url(assets/fonts/Vroom/Calibre-Regular.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Calibre;
    font-weight: 600;
    src: url(assets/fonts/Vroom/Calibre-Semibold.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Vroom Sans;
    font-weight: normal;
    src: url(assets/fonts/Vroom/Vroom-Sans.woff2) format('woff2');
    font-display: swap;
  }
  
  #__next {
    height: 100%;
  }
`;
