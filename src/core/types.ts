import { Theme as MuiTheme } from '@material-ui/core/styles';
import { Typography as MuiThemeTypography } from '@material-ui/core/styles/createTypography';

export enum Brand {
  VROOM = 'vroom',
  SANTANDER = 'santander',
  TDA = 'tda',
}

export interface ThemeTypography extends MuiThemeTypography {
  fontWeightSemibold: number;
}

export interface Theme extends MuiTheme {
  typography: ThemeTypography;
}
