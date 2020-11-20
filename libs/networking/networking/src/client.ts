/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GraphQLClient } from 'graphql-request';

import {
  ClientDef,
  GQLRequestOptions,
  GQLRequestVariables,
  Response,
  ResponseErrorInterceptor,
  ResponseSuccessInterceptor,
} from './types';

export interface ClientImplOptions {
  endpoint: string;
  timeout?: number; // milliseconds
}

export class Client implements ClientDef {
  private readonly graphQLClient: GraphQLClient;

  private errorInterceptor?: ResponseErrorInterceptor;
  private responseInterceptor?: ResponseSuccessInterceptor;

  constructor(options: ClientImplOptions) {
    this.graphQLClient = new GraphQLClient(options.endpoint, {
      timeout: options.timeout,
    });
  }

  /**
   * Allow to intercept data or error to perform others actions
   * @param errorInterceptor function it will receive the error object
   * @param responseInterceptor optional Function
   */
  addResponseInterceptor(
    errorInterceptor?: ResponseErrorInterceptor,
    responseInterceptor?: ResponseSuccessInterceptor
  ) {
    if (errorInterceptor) {
      this.errorInterceptor = errorInterceptor;
    }
    if (responseInterceptor) {
      this.responseInterceptor = responseInterceptor;
    }
  }

  async gqlRequest<D = unknown, V = GQLRequestVariables>(
    options: GQLRequestOptions<V>
  ): Promise<Response<D>> {
    this.graphQLClient.setHeaders(options.headers || undefined);
    try {
      const data = await this.graphQLClient.request(
        options.document,
        options.variables
      );

      if (this.responseInterceptor) {
        await this.responseInterceptor(data);
      }

      return {
        data: data as D,
      };
    } catch (error) {
      const status: number | undefined =
        error.response && error.response.status
          ? error.response.status
          : undefined;

      if (this.errorInterceptor) {
        await this.errorInterceptor({
          error,
          status,
        });
      }

      return {
        error,
        status,
      };
    }
  }
}
