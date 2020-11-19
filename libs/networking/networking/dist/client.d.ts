import { ClientDef, GQLRequestOptions, GQLRequestVariables, Response } from './types';
export interface ClientImplOptions {
    endpoint: string;
    timeout?: number;
}
export declare class Client implements ClientDef {
    private readonly graphQLClient;
    interceptors: {
        request: () => Promise<void>;
        response: (error: any) => Promise<never>;
    };
    constructor(options: ClientImplOptions);
    gqlRequest<D = unknown, V = GQLRequestVariables>(options: GQLRequestOptions<V>): Promise<Response<D>>;
}
