import { DealsV2Networker } from '@vroom-web/deals-v2-networking';
import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, makeObservable, observable, runInAction } from 'mobx';

import { Status } from 'src/networking/types';

export enum DealStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In-Progress',
  NO_DEAL = 'No Deal',
}

export class StartPurchaseStore {
  @observable userTokenStatus: Status = Status.INITIAL;
  @observable dealStatus: DealStatus = DealStatus.NO_DEAL;
  @observable accessToken?: string;
  @observable vin?: string;
  @observable step = '';

  private dealsV2Networker: DealsV2Networker;

  constructor(gearboxPrivateUrl: string) {
    this.dealsV2Networker = new DealsV2Networker(gearboxPrivateUrl);
    makeObservable(this);
  }

  @action
  private initDealStatus = async (): Promise<void> => {
    try {
      const accessToken = this.accessToken;
      if (!accessToken) {
        throw new Error('No accessToken was found');
      }
      const response = await this.dealsV2Networker.getMyDeals(accessToken);

      const isPendingDeal = response.data.user.deals.find(
        (deal) => deal.dealSummary.dealStatus.status === 'Pending'
      );
      const isInProgressDeal = response.data.user.deals.find(
        (deal) => deal.dealSummary.dealStatus.status === 'In-Progress'
      );
      if (!isPendingDeal && !isInProgressDeal) {
        throw new Error('No deal was found');
      }
      runInAction(() => {
        if (isPendingDeal) {
          this.dealStatus = DealStatus.PENDING;
        }
        if (isInProgressDeal) {
          this.vin = isInProgressDeal.dealSummary.inventory.vehicle.vin;
          this.step = isInProgressDeal.dealSummary.dealStatus.step;
          this.dealStatus = DealStatus.IN_PROGRESS;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.dealStatus = DealStatus.NO_DEAL;
      });
    }
  };

  @action
  private initUserAccount = async (): Promise<void> => {
    try {
      // https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md#express
      const authTokenWithExpressPrefix = ClientSideCookies.get('authToken');
      if (!authTokenWithExpressPrefix) {
        return undefined;
      }
      const authToken = JSON.parse(authTokenWithExpressPrefix.slice(2));
      const { exp: expirationTimestamp } = jwtDecode(authToken.accessToken);
      const loggedIn = expirationTimestamp > new Date().getTime() / 1000;
      if (!loggedIn) {
        return undefined;
      }
      try {
        this.accessToken = authToken.accessToken;
      } catch {
        this.accessToken = undefined;
      }
    } catch {
      runInAction(() => {
        this.userTokenStatus = Status.ERROR;
      });
    }
  };

  @action
  initClientSide = (): void => {
    this.initUserAccount();
    this.initDealStatus();
  };
}
