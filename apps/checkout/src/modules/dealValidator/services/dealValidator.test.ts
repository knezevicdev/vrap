import { ErrorResponse, Response } from '@vroom-web/networking';
import RouterNext, { Router, SingletonRouter } from 'next/router';

import { excludePage, initDealValidator } from './dealValidator';
import Deals from './mockData/deals.json';
import Unauthorized from './mockData/unauthorized.json';

import { buildUrl } from 'src/navigation/Navigation';
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

      const response = await initDealValidator(RouterNext);

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

      const response = await initDealValidator(RouterNext);

      expect(response.isVehicleSold).toBeTruthy();
    });

    it('In-Progress Deal Deposit Captured', async () => {
      //Mock API GraphQL Call
      const spy = jest.spyOn(Request, 'getDealValidator');
      const fn = (Promise.resolve(Deals[2]) as unknown) as Promise<
        Response<Request.DealValidatorData>
      >;
      spy.mockReturnValue(fn);

      const response = await initDealValidator(RouterNext);

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

      const response = await initDealValidator(RouterNext);

      expect(response.isDepositCaptured).toBeFalsy();
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

      const response = await initDealValidator(RouterNext);

      expect(response.isAuthenticated).toBeFalsy();
    });
  });

  it('Exclude documentUpload Page all the rules except check pending deal Modal', async () => {
    const RouterNext = ({
      router: {
        route: '/documentUpload',
        pathname: '/documentUpload',
        basePath: '/checkout',
      },
    } as unknown) as SingletonRouter;

    //Mock API GraphQL Call
    const spy = jest.spyOn(Request, 'getDealValidator');
    //Using deal status Pending Deal
    const fn = (Promise.resolve(Deals[4]) as unknown) as Promise<
      Response<Request.DealValidatorData>
    >;
    spy.mockReturnValue(fn);

    const response = await initDealValidator(RouterNext);

    //Apply only this rule.
    expect(response.hasPendingDeal).toBeTruthy();

    expect(response.isDepositCaptured).toBeFalsy();
    expect(response.hasInProgressDeal).toBeFalsy();
    expect(response.hasInProgressDeal).toBeFalsy();
  });

  it('Exclude Congratulation Page for all the rules', async () => {
    const RouterNext = ({
      router: {
        route: '/congratulations',
        pathname: '/congratulations',
        basePath: '/checkout',
      },
    } as unknown) as SingletonRouter;

    //Mock API GraphQL Call
    const spy = jest.spyOn(Request, 'getDealValidator');
    //Using deal status Pending Deal
    const fn = (Promise.resolve(Deals[4]) as unknown) as Promise<
      Response<Request.DealValidatorData>
    >;
    spy.mockReturnValue(fn);

    const response = await initDealValidator(RouterNext);

    //Apply only this rule.
    expect(response.hasPendingDeal).toBeFalsy();
    expect(response.isDepositCaptured).toBeFalsy();
    expect(response.hasInProgressDeal).toBeFalsy();
    expect(response.hasInProgressDeal).toBeFalsy();
  });
});
