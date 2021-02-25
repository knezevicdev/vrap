import get from 'lodash/get';
import NextJSRouter from 'next/router';

/**
 * Get the current VIN number from the parameter
 * @param parameterName
 */

export const getCurrentVin = (): string | undefined => {
  const { router } = NextJSRouter;
  return get(router, `query.vin`);
};
