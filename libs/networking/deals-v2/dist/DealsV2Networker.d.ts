import { GetMyDealsResponse } from './types/GetMyDeals';
export interface DealsV2Networking {
    getMyDeals(accessToken: string): Promise<GetMyDealsResponse>;
}
export default class DealsV2Networker implements DealsV2Networking {
    private readonly axiosInstance;
    private readonly hostUrl;
    constructor(hostUrl: string);
    getMyDeals(accessToken: string): Promise<GetMyDealsResponse>;
}
