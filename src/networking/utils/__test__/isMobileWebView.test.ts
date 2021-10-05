import { isMobileWebView } from '../isMobileWebView';

describe('Is Mobile Web View Test', () => {
  it('should return true if android web view', () => {
    const query = {
      // eslint-disable-next-line
      utm_source: 'vroom_app_android',
    };
    expect(isMobileWebView(query)).toEqual(true);
  });

  it('should return true if ios web view', () => {
    const query = {
      // eslint-disable-next-line
      utm_source: 'vroom_app_ios',
    };
    expect(isMobileWebView(query)).toEqual(true);
  });

  it('should return false otherwise', () => {
    const query = {};
    expect(isMobileWebView(query)).toEqual(false);
  });
});
