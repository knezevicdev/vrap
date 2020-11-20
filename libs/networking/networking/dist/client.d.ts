import { ClientDef, GQLRequestOptions, GQLRequestVariables, Response } from './types';
export interface ClientImplOptions {
    endpoint: string;
    timeout?: number;
}
export declare class Client implements ClientDef {
    private readonly graphQLClient;
    private responseInterceptor;
    private errorInterceptor;
    constructor(options: ClientImplOptions);
    /**
     * Allow to intercept data or error to perform others actions
     * @param errorInterceptor function it will receive the error object
     * @param responseInterceptor optional Function
     */
    addResponseInterceptor(errorInterceptor: (error: unknown) => void, responseInterceptor?: (data: unknown) => void): void;
    gqlRequest<D = unknown, V = GQLRequestVariables>(options: GQLRequestOptions<V>): Promise<Response<D>>;
}
