import { createGlobalStyle } from 'styled-components';

import CalibreRegular from '../fonts/Vroom/Calibre-Regular.woff2';
import CalibreSemibold from '../fonts/Vroom/Calibre-Semibold.woff2';
import VroomSans from '../fonts/Vroom/Vroom-Sans.woff2';
import { ThemeProps } from '../types';

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
  @font-face {
    font-family: Calibre;
    font-weight: normal;
    src: url(${CalibreRegular}) format('woff2');
  }
  @font-face {
    font-family: Calibre;
    font-weight: 600;
    src: url(${CalibreSemibold}) format('woff2');
  }
  @font-face {
    font-family: Vroom Sans;
    font-weight: normal;
    src: url(${VroomSans}) format('woff2');
  }
`;
