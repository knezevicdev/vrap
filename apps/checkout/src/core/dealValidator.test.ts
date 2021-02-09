import { ErrorResponse, Response } from '@vroom-web/networking';
import { AppContext } from 'next/app';
import { Router } from 'next/router';

import { buildUrl, excludePage, initDealValidator } from './dealValidator';
import appContext from './mockData/appContext.json';
import Deals from './mockData/deals.json';
import Unauthorized from './mockData/unauthorized.json';

import * as Request from 'src/networking/request';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: { BASE_PATH: '/checkout' },
}));

describe('Deal Validator', () => {
  it('Build Checkout URL ', () => {
    const url = buildUrl('JTDKARFU6K3085481', 'registration');
    expect(url).toBe('/checkout/JTDKARFU6K3085481/registration');
  });

  it('Exclude Page for deal validator', () => {
    const congratsRoute = ({
      route: '/congratulations',
      pathname: '/congratulations',
      basePath: '/checkout',
    } as unknown) as Router;

    const isExcludeCongrats = excludePage(congratsRoute);
    expect(isExcludeCongrats).toBeTruthy();

    const docRoute = ({
      route: '/[vin]/documentUpload',
      pathname: '/[vin]/documentUpload',
      basePath: '/checkout',
    } as unknown) as Router;

    const docRouteExclude = excludePage(docRoute);
    expect(docRouteExclude).toBeTruthy();
  });

  describe('App Deal Validator', () => {
    it('In Progress Deal', async () => {
      //Mock API GraphQL Call
      const spy = jest.spyOn(Request, 'getDealValidator');
      const fn = (Promise.resolve(Deals[0]) as unknown) as Promise<
        Response<Request.DealValidatorData>
      >;
      spy.mockReturnValue(fn);

      const response = await initDealValidator(
        (appContext as unknown) as AppContext
      );

      expect(response.isAuthenticated).toBeTruthy();
      expect(response.isVehicleSold).toBeFalsy();
      expect(response.hasPendingDeal).toBeFalsy();
      expect(response.hasInProgressDeal).toBeTruthy();
      expect(response.isDepositCaptured).toBeFalsy();
    });

    it('Vehicle Sold', async () => {
      //Mock API GraphQL Call
      const spy = jest.spyOn(Request, 'getDealValidator');
      const fn = (Promise.resolve(Deals[1]) as unknown) as Promise<
        Response<Request.DealValidatorData>
      >;
      spy.mockReturnValue(fn);

      const response = await initDealValidator(
        (appContext as unknown) as AppContext
      );

      expect(response.isVehicleSold).toBeTruthy();
    });

    it('In-Progress Deal Deposit Captured', async () => {
      //Mock API GraphQL Call
      const spy = jest.spyOn(Request, 'getDealValidator');
      const fn = (Promise.resolve(Deals[2]) as unknown) as Promise<
        Response<Request.DealValidatorData>
      >;
      spy.mockReturnValue(fn);

      const response = await initDealValidator(
        (appContext as unknown) as AppContext
      );

      expect(response.hasInProgressDeal).toBeTruthy();
      expect(response.isDepositCaptured).toBeTruthy();
      expect(response.hasPendingDeal).toBeFalsy();
    });

    it('Pending Deal Deposit Captured', async () => {
      //Mock API GraphQL Call
      const spy = jest.spyOn(Request, 'getDealValidator');
      const fn = (Promise.resolve(Deals[3]) as unknown) as Promise<
        Response<Request.DealValidatorData>
      >;
      spy.mockReturnValue(fn);

      const response = await initDealValidator(
        (appContext as unknown) as AppContext
      );

      expect(response.isDepositCaptured).toBeTruthy();
      expect(response.hasPendingDeal).toBeTruthy();
      expect(response.hasInProgressDeal).toBeFalsy();
    });

    it('Unauthorized User', async () => {
      //Mock API GraphQL Call
      const spy = jest.spyOn(Request, 'getDealValidator');
      const fn = (Promise.resolve(
        Unauthorized
      ) as unknown) as Promise<ErrorResponse>;
      spy.mockReturnValue(fn);

      const response = await initDealValidator(
        (appContext as unknown) as AppContext
      );

      expect(response.isAuthenticated).toBeFalsy();
    });
  });
});
