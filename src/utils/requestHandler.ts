import { NextApiHandler } from 'next/dist/shared/lib/utils';

interface RequestConfig {
  method: string;
}

const requestHandler = <T = unknown>(
  handler: NextApiHandler<T>,
  config: RequestConfig
): NextApiHandler<T> => {
  return async (req, res) => {
    if (req.method?.toUpperCase() !== config.method.toUpperCase()) {
      res.setHeader('Allow', config.method.toUpperCase());
      res.status(405).end();
      return;
    }

    if (handler.constructor.name === 'AsyncFunction') {
      await handler(req, res);
      return;
    }
    handler(req, res);
  };
};

export default requestHandler;
