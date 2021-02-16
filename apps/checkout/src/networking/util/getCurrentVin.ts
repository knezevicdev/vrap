import NextJSRouter from 'next/router';
import get from "lodash/get";

/**
 * Utility to get parameter
 * @param parameterName 
 */

export const getCurrentVin = (): string | undefined => {
    const { router } = NextJSRouter;
     return get(router, `query.vin`);
}