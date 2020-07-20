import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import { Brand } from './types';
import { getThemeForBrand } from './util';

interface Props {
  brand?: Brand;
}

const ThemeProvider: React.FC<Props> = ({ brand = Brand.VROOM, children }) => {
  const theme = getThemeForBrand(brand);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
