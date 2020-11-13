import { GraphQLClient } from 'graphql-request';
import { mocked } from 'ts-jest/utils';

import { ClientImpl } from './client';

jest.mock('graphql-request');

describe('checkout networking client', () => {
  const endpoint = 'test-endpoint';
  const document = 'test-document';
  const variables = {
    var1: 'value1',
    var2: 'value2',
    var3: true,
  };
  const graphQLClient = ({
    request: jest.fn(),
    setHeaders: jest.fn(),
  } as unknown) as GraphQLClient;

  beforeAll(() => {
    mocked(GraphQLClient).mockImplementation(() => graphQLClient);
  });

  afterEach(() => {
    mocked(GraphQLClient).mockClear();
    mocked(graphQLClient.request).mockClear();
    mocked(graphQLClient.setHeaders).mockClear();
  });

  it('creates a graphql client instance using the proper endpoint', () => {
    new ClientImpl({
      endpoint,
      timeout: 1000,
    });
    expect(GraphQLClient).toHaveBeenCalledWith(endpoint, {
      timeout: 1000,
    });
    expect(GraphQLClient).toHaveReturnedWith(graphQLClient);
  });

  it('makes a request with the right options set', async () => {
    const clientImpl = new ClientImpl({
      endpoint,
      timeout: 1000,
    });
    mocked(graphQLClient.request).mockImplementationOnce(async () => ({
      test: true,
    }));
    await clientImpl.gqlRequest({
      document,
      variables,
    });
    expect(graphQLClient.request).toHaveBeenCalledWith(document, variables);
  });

  test('headers are set correctly', async () => {
    const clientImpl = new ClientImpl({
      endpoint,
      timeout: 1000,
    });
    const headers = {
      Authorization: 'Bearer <token>',
    };
    await clientImpl.gqlRequest({
      document,
      variables,
      headers,
    });
    expect(graphQLClient.setHeaders).toHaveBeenCalledWith(headers);
  });
});
