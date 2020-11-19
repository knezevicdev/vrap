import { ClientDef, GQLRequestOptions, GQLRequestVariables, Response } from './types';
export interface ClientImplOptions {
    endpoint: string;
    timeout?: number;
}
export declare class Client implements ClientDef {
    private readonly graphQLClient;
    constructor(options: ClientImplOptions);
    gqlRequest<D = unknown, V = GQLRequestVariables>(options: GQLRequestOptions<V>): Promise<Response<D>>;
}
