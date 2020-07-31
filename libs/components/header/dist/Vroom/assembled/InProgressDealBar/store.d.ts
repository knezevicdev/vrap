import { Deal } from '@vroom-web/deals-v2-networking';
import { Status } from '../../networking/types';
declare class InProgressDealBarStore {
    private static authTokenCookieName;
    private dealsV2Networker;
    inProgressDeal: Deal;
    inProgressDealStatus: Status;
    constructor(gearboxPrivateUrl: string);
    private getAccessToken;
    private initInProgressDeal;
    initClientSide: () => void;
}
export default InProgressDealBarStore;
