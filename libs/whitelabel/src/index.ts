import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
export enum Brand {
  VROOM = 'vroom',
  SANTANDER = 'santander',
  TDA = 'tda',
}
export interface RequestContext {
  req?: IncomingMessage;
  query: ParsedUrlQuery;
}

export const determineWhitelabel = (ctx: RequestContext): Brand => {
  let brand = Brand.VROOM;

  const headerBrandKey = 'x-brand';
  const brandHeader = ctx.req && ctx.req.headers[headerBrandKey];
  const queryBrand = ctx.query.brand;

  const whitelabel = brandHeader || queryBrand;

  // check header/query/cached brand val exists in enum and is valid
  if (Object.values(Brand).includes(whitelabel as Brand))
    brand = whitelabel as Brand;

  return brand;
};
