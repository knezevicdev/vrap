import { Deal, DealsV2Networker } from '@vroom-web/deals-v2-networking';
import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, observable, runInAction } from 'mobx';

import { Status } from '../../networking/types';

class InProgressDealBarStore {
  private static authTokenCookieName = 'authToken';

  private dealsV2Networker: DealsV2Networker;

  @observable inProgressDeal: Deal = {} as Deal;
  @observable inProgressDealStatus: Status = Status.INITIAL;

  constructor(gearboxPrivateUrl: string) {
    this.dealsV2Networker = new DealsV2Networker(gearboxPrivateUrl);
  }

  private getAccessToken = (): string | undefined => {
    try {
      // https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md#express
      const authTokenWithExpressPrefix = ClientSideCookies.get(
        InProgressDealBarStore.authTokenCookieName
      );
      if (!authTokenWithExpressPrefix) {
        return undefined;
      }
      const authToken = JSON.parse(authTokenWithExpressPrefix.slice(2));
      const { exp: expirationTimestamp } = jwtDecode(authToken.accessToken);
      const loggedIn = expirationTimestamp > new Date().getTime() / 1000;
      if (!loggedIn) {
        return undefined;
      }
      return authToken.accessToken;
    } catch {
      return undefined;
    }
  };

  @action
  private initInProgressDeal = async (): Promise<void> => {
    try {
      const accessToken = this.getAccessToken();
      if (!accessToken) {
        throw new Error('No accessToken was found');
      }
      this.inProgressDealStatus = Status.FETCHING;
      const response = await this.dealsV2Networker.getMyDeals(accessToken);
      const inProgressDeal = response.data.user.deals.find(
        (deal) => deal.dealSummary.dealStatus.status === 'In-Progress'
      );
      if (!inProgressDeal) {
        throw new Error('No In-Progress deal was found');
      }
      runInAction(() => {
        this.inProgressDeal = inProgressDeal;
        this.inProgressDealStatus = Status.SUCCESS;
      });
    } catch {
      runInAction(() => {
        this.inProgressDealStatus = Status.ERROR;
      });
    }
  };

  @action
  initClientSide = (): void => {
    this.initInProgressDeal();
  };
}

export default InProgressDealBarStore;
