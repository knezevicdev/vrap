import { DealsV2Networker } from '@vroom-web/deals-v2-networking';
import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, observable, runInAction } from 'mobx';

import { Status } from 'src/networking/types';

export class StartPurchaseStore {
  @observable userTokenStatus: Status = Status.INITIAL;
  @observable inProgressDealStatus: Status = Status.INITIAL;
  @observable accessToken?: string;

  private dealsV2Networker: DealsV2Networker;

  constructor(gearboxPrivateUrl: string) {
    this.dealsV2Networker = new DealsV2Networker(gearboxPrivateUrl);
  }

  @action
  private initPendingDeal = async (): Promise<void> => {
    try {
      const accessToken = this.accessToken;
      if (!accessToken) {
        throw new Error('No accessToken was found');
      }
      this.inProgressDealStatus = Status.FETCHING;
      const response = await this.dealsV2Networker.getMyDeals(accessToken);

      const isPendingDeal = response.data.user.deals.find(
        (deal) => deal.dealSummary.dealStatus.status === 'Pending'
      );
      if (!isPendingDeal) {
        throw new Error('No In-Progress deal was found');
      }
      runInAction(() => {
        this.inProgressDealStatus = Status.SUCCESS;
      });
    } catch (error) {
      runInAction(() => {
        this.inProgressDealStatus = Status.ERROR;
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
    this.initPendingDeal();
  };
}
