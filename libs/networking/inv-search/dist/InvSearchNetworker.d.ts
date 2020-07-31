import { GetInventoryCountResponse } from './types/GetInventoryCount';
import { GetInventorySimilarRequestData, GetInventorySimilarResponse } from './types/GetInventorySimilar';
import { GetInventorySuggestionsResponse } from './types/GetInventorySuggestions';
import { PostInventoryRequestData, PostInventoryResponse } from './types/PostInventory';
export interface InvSearchNetworking {
    getInventoryCount(): Promise<GetInventoryCountResponse>;
    getInventorySimilar(data: GetInventorySimilarRequestData): Promise<GetInventorySimilarResponse>;
    getInventorySuggestions(input: string): Promise<GetInventorySuggestionsResponse>;
    postInventory(data: PostInventoryRequestData): Promise<PostInventoryResponse>;
}
export default class InvSearchNetworker implements InvSearchNetworking {
    private readonly axiosInstance;
    private readonly hostUrl;
    constructor(hostUrl: string);
    getInventoryCount(): Promise<GetInventoryCountResponse>;
    getInventorySimilar(data: GetInventorySimilarRequestData): Promise<GetInventorySimilarResponse>;
    getInventorySuggestions(input: string): Promise<GetInventorySuggestionsResponse>;
    postInventory(data: PostInventoryRequestData): Promise<PostInventoryResponse>;
}
