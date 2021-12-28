import { selectTheme, isKioskMode } from './selectors';
import { THEME_TYPE } from './types';

describe('selectTheme', () => {
  it('should return the Vroom theme when the type is Vroom', () => {
    const state = { theme: { type: THEME_TYPE.VROOM } };
    expect(selectTheme(state)).toEqual(THEME_TYPE.VROOM);
  });

  it('should return the TDA theme when the type is TDA', () => {
    const state = { theme: { type: THEME_TYPE.TDA } };
    expect(selectTheme(state)).toEqual(THEME_TYPE.TDA);
  });
});

describe('isKioskMode', () => {
  it('should return false when mode is anything but kiosk or mode is undefined', () => {
    const state = { theme: {} };
    expect(isKioskMode(state)).toBe(false);
  });

  it('should return true when mode is kiosk and theme is TDA', () => {
    const state = { theme: { mode: 'kiosk', type: THEME_TYPE.TDA } };
    expect(isKioskMode(state)).toBe(true);
  });
});
