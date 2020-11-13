import { Brand } from '@vroom-web/ui';
import { GetServerSidePropsContext } from 'next';
import { DocumentContext } from 'next/document';

export const determineWhitelabel = (
  ctx: GetServerSidePropsContext | DocumentContext
): Brand => {
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
