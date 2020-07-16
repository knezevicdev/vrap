import santanderTheme from './themes/santander';
import vroomTheme from './themes/vroom';
import { Brand, Theme } from './types';

export const getThemeForBrand = (brand: Brand): Theme => {
  if (brand === Brand.SANTANDER) {
    return santanderTheme;
  }
  return vroomTheme;
};
