import santanderTheme from './themes/santander';
import tdaTheme from './themes/tda';
import vroomTheme from './themes/vroom';
import { Brand, Theme } from './types';

export const getThemeForBrand = (brand: Brand): Theme => {
  if (brand === Brand.SANTANDER) {
    return santanderTheme;
  }
  if (brand === Brand.TDA) {
    return tdaTheme;
  }
  return vroomTheme;
};
