import { Client, GQLRequestOptions, GQLRequestVariables, Response } from './types';
export interface ClientImplOptions {
    endpoint: string;
    timeout?: number;
}
export declare class ClientImpl implements Client {
    private readonly graphQLClient;
    constructor(options: ClientImplOptions);
    gqlRequest<D = unknown, V = GQLRequestVariables>(options: GQLRequestOptions<V>): Promise<Response<D>>;
}
