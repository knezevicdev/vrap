export interface InventoryServiceNetworking {
    getInventoryAvailability(vin: string): Promise<boolean>;
}
export default class InventoryServiceNetworker implements InventoryServiceNetworking {
    private readonly axiosInstance;
    private readonly hostUrl;
    constructor(hostUrl: string);
    getInventoryAvailability(vin: string): Promise<boolean>;
}
