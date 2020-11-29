import { ClientDef, GQLRequestOptions, GQLRequestVariables, Response, ResponseErrorInterceptor, ResponseSuccessInterceptor } from './types';
export interface ClientImplOptions {
    timeout?: number;
}
export declare class Client implements ClientDef {
    private readonly graphQLClient;
    private errorInterceptor?;
    private successInterceptor?;
    constructor(endpoint: string, options?: ClientImplOptions);
    /**
     * Allow to intercept data or error to perform others actions
     * @param errorInterceptor function it will receive the error object
     * @param successInterceptor optional Function
     */
    addResponseInterceptor(errorInterceptor?: ResponseErrorInterceptor, successInterceptor?: ResponseSuccessInterceptor): void;
    gqlRequest<D = unknown, V = GQLRequestVariables>(options: GQLRequestOptions<V>): Promise<Response<D>>;
}
