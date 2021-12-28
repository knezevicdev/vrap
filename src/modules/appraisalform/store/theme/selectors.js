import { THEME_TYPE, THEME_MODE } from './types';

export const selectTheme = state => {
  return state.theme.type;
};

export const selectIsThemeTDA = state => {
  return selectTheme(state) === THEME_TYPE.TDA;
};

export const selectThemeMode = state => {
  return state.theme ? state.theme.mode : undefined;
};

export const isKioskMode = state => {
  return (
    selectThemeMode(state) === THEME_MODE.KIOSK &&
    selectTheme(state) === THEME_TYPE.TDA
  );
};
