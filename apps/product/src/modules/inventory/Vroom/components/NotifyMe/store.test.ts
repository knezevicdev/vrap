import ClientSideCookies from 'js-cookie';

import { NotifyMeStore } from './store';
jest.mock('js-cookie');

describe('NotifyMe Store Test', () => {
  describe('Init Client Side', () => {
    describe('Logged In behavior', () => {
      const store = new NotifyMeStore();
      it('should set the access token from cookies if not expired', () => {
        const data = {
          exp: (new Date().getTime() + 1000000) / 1000,
        };
        const MOCK_ACCESS_TOKEN = `blah.${btoa(JSON.stringify(data))}.blah`;
        ClientSideCookies.get = jest.fn().mockReturnValue(
          'j:' +
            JSON.stringify({
              accessToken: MOCK_ACCESS_TOKEN,
            })
        );

        store.initClientSide();
        expect(store.accessToken).toEqual(MOCK_ACCESS_TOKEN);
      });
    });

    describe('Logged out behavior', () => {
      const store = new NotifyMeStore();
      it('should set the access token undefined if expired', () => {
        const data = {
          exp: new Date().getTime() / 1000,
        };
        const MOCK_ACCESS_TOKEN = `blah.${btoa(JSON.stringify(data))}.blah`;
        ClientSideCookies.get = jest.fn().mockReturnValue(
          'j:' +
            JSON.stringify({
              accessToken: MOCK_ACCESS_TOKEN,
            })
        );

        store.initClientSide();
        expect(store.accessToken).toEqual(undefined);
      });
    });
  });
});
