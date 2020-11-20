import { createGlobalStyle, css } from 'styled-components';

import { ThemeProps } from './types';

export const getTheme = (fontPath: string): ThemeProps => {
  return {
    typography: {
      family: {
        heading: 'Vroom Sans',
        title: 'Calibre',
        body: 'Calibre',
      },
      color: '#041022',
      fontPath: fontPath,
    },
    colors: {
      primary: {
        red: '#E7131A',
        black: '#041022',
        white: '#FFFFFF',
      },
      secondary: {
        blue: '#1960D0',
        green: '#308406',
        orange: '#F26900',
        yellow: '#FFD400',
        red: '#FC4349',
        pink: '#FEE8E9',
      },
      neutral: {
        gray1: '#6C717A',
        gray2: '#999DA3',
        gray3: '#D6D7DA',
        gray4: '#F5F5F5',
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

const fontPath = ({ theme: { typography } }: { theme: ThemeProps }): string =>
  typography.fontPath;

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
    src: url(${fontPath}/Calibre-Regular.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Calibre;
    font-weight: 600;
    src: url(${fontPath}/Calibre-Semibold.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Vroom Sans;
    font-weight: normal;
    src: url(${fontPath}/Vroom-Sans.woff2) format('woff2');
    font-display: swap;
  }
  
  #__next {
    height: 100%;
  }
`;
