import { GraphQLClient } from 'graphql-request';

import {
  Client,
  GQLRequestOptions,
  GQLRequestVariables,
  Response,
} from './types';

export interface ClientImplOptions {
  endpoint: string;
  timeout?: number; // milliseconds
}

export class ClientImpl implements Client {
  private readonly graphQLClient: GraphQLClient;

  constructor(options: ClientImplOptions) {
    this.graphQLClient = new GraphQLClient(options.endpoint, {
      timeout: options.timeout,
    });
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
      return {
        data: data as D,
      };
    } catch (error) {
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
