// Jest seems to hang for this test suite.
// Much google searching leads me to believe everything is being cleaned up correctly.
// And there is an open issue for jest hanging: https://github.com/facebook/jest/issues/9473

import { createServer, RequestListener, Server } from 'http';
import url from 'url';

import { ClientImpl } from './client';
import { isErrorResponse, isSuccessResponse } from './typeguards';

const serverSuccessPayload = {
  data: {
    version: 1,
  },
};

const serverErrorPayload = {
  errors: [
    /* We only care whether the "errors" key exists */
  ],
};

const serverRequestListener: RequestListener = (req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end();
    return;
  }
  const xTestHeader = req.headers['x-test'];
  const pathname = url.parse(req.url).pathname;
  switch (pathname) {
    case '/200':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(serverSuccessPayload));
      res.end();
      break;
    case '/200-error':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(serverErrorPayload));
      res.end();
      break;
    case '/400':
      res.writeHead(400);
      // Send successful data to verify the status code takes priority.
      res.write(JSON.stringify(serverSuccessPayload));
      res.end();
      break;
    case '/401':
      res.writeHead(401);
      // Send successful data to verify the status code takes priority.
      res.write(JSON.stringify(serverSuccessPayload));
      res.end();
      break;
    case '/500':
      res.writeHead(500);
      // Send successful data to verify the status code takes priority.
      res.write(JSON.stringify(serverSuccessPayload));
      res.end();
      break;
    case '/timeout':
      setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(serverSuccessPayload));
        res.end();
      }, 2000);
      break;
    case '/headers':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(
        JSON.stringify({
          data: {
            xTestHeaderDefined: !!xTestHeader,
          },
        })
      );
      res.end();
      break;
    default:
      res.writeHead(400);
      res.end();
  }
};

describe('network behavior is handled correctly', () => {
  const endpointBase = 'http://localhost:8080';
  const document = 'test-document';
  const variables = {
    var1: 'value1',
    var2: 'value2',
    var3: true,
  };

  let server: Server;
  beforeAll((done) => {
    server = createServer(serverRequestListener);
    server.listen(8080, done);
  });
  afterAll((done) => {
    server.close(done);
  });

  test('handles invalid endpoint correctly', async () => {
    const unusedPort = 1337;
    const clientImpl = new ClientImpl({
      endpoint: `http://localhost:${unusedPort}`,
      timeout: 1000,
    });
    const res = await clientImpl.gqlRequest({
      document,
      variables,
    });
    if (!isErrorResponse(res)) {
      fail();
    }
    expect(res.status).toBeUndefined();
  });

  test('success responses are handled correctly', async () => {
    const clientImpl = new ClientImpl({
      endpoint: `${endpointBase}/200`,
      timeout: 1000,
    });
    const res = await clientImpl.gqlRequest<{ version: number }>({
      document,
      variables,
    });
    if (!isSuccessResponse(res)) {
      fail();
    }
    expect(res.data.version).toEqual(1);
  });

  test('sneaky 200OK error responses are handled correctly', async () => {
    const clientImpl = new ClientImpl({
      endpoint: `${endpointBase}/200-error`,
      timeout: 1000,
    });
    const res = await clientImpl.gqlRequest({
      document,
      variables,
    });
    if (!isErrorResponse(res)) {
      fail();
    }
    expect(res.status).toEqual(200);
  });

  test('400 responses are handled correctly', async () => {
    const clientImpl = new ClientImpl({
      endpoint: `${endpointBase}/400`,
      timeout: 1000,
    });
    const res = await clientImpl.gqlRequest({
      document,
      variables,
    });
    if (!isErrorResponse(res)) {
      fail();
    }
    expect(res.status).toEqual(400);
  });

  test('401 responses are handled correctly', async () => {
    const clientImpl = new ClientImpl({
      endpoint: `${endpointBase}/401`,
      timeout: 1000,
    });
    const res = await clientImpl.gqlRequest({
      document,
      variables,
    });
    if (!isErrorResponse(res)) {
      fail();
    }
    expect(res.status).toEqual(401);
  });

  test('500 responses are handled correctly', async () => {
    const clientImpl = new ClientImpl({
      endpoint: `${endpointBase}/500`,
      timeout: 1000,
    });
    const res = await clientImpl.gqlRequest({
      document,
      variables,
    });
    if (!isErrorResponse(res)) {
      fail();
    }
    expect(res.status).toEqual(500);
  });

  test('long server responses trigger a timeout', async () => {
    const clientImpl = new ClientImpl({
      endpoint: `${endpointBase}/timeout`,
      timeout: 1000, // lower than what the response will take.
    });
    const res = await clientImpl.gqlRequest({
      document,
      variables,
    });
    if (!isErrorResponse(res)) {
      fail();
    }
    expect(res.status).toBeUndefined();
  });

  test('headers are sent correctly', async () => {
    const clientImpl = new ClientImpl({
      endpoint: `${endpointBase}/headers`,
      timeout: 1000,
    });
    const headers = {
      'x-test': 'TestHeader',
    };
    const res = await clientImpl.gqlRequest<{
      xTestHeaderDefined: boolean;
    }>({
      document,
      variables,
      headers,
    });
    if (!isSuccessResponse(res)) {
      fail();
    }
    expect(res.data.xTestHeaderDefined).toBeTruthy();
  });
});