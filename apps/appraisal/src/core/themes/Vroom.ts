import { createGlobalStyle } from 'styled-components';

import ENVS from 'src/integrations/Envs';

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
  body {
    margin: 0;
  }

  @font-face {
    font-family: Calibre;
    font-weight: normal;
    src: url(${ENVS.BASE_PATH}/fonts/Vroom/Calibre-Regular.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Calibre;
    font-weight: 600;
    src: url(${ENVS.BASE_PATH}/fonts/Vroom/Calibre-Semibold.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Vroom Sans;
    font-weight: normal;
    src: url(${ENVS.BASE_PATH}/fonts/Vroom/Vroom-Sans.woff2) format('woff2');
    font-display: swap;
  }
`;
