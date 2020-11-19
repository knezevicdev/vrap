/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GraphQLClient } from 'graphql-request';

import {
  ClientDef,
  GQLRequestOptions,
  GQLRequestVariables,
  Response,
} from './types';

export interface ClientImplOptions {
  endpoint: string;
  timeout?: number; // milliseconds
}

export class Client implements ClientDef {
  private readonly graphQLClient: GraphQLClient;

  private responseInterceptor: unknown;
  private errorInterceptor: unknown;

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
    errorInterceptor: (error: unknown) => void,
    responseInterceptor?: (data: unknown) => void
  ) {
    if (typeof errorInterceptor === 'function') {
      this.errorInterceptor = errorInterceptor;
    }
    if (typeof responseInterceptor === 'function') {
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

      if (typeof this.responseInterceptor === 'function') {
        await this.responseInterceptor(data);
      }

      return {
        data: data as D,
      };
    } catch (error) {
      if (typeof this.errorInterceptor === 'function') {
        await this.errorInterceptor(error);
      }

      const status: number | undefined =
        error.response && error.response.status
          ? error.response.status
          : undefined;
      return {
        error,
        status,
      };
    }
  }
}
