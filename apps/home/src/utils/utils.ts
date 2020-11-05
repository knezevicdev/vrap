import { Brand } from '@vroom-web/ui';
import { NextPageContext } from 'next';
import getConfig from 'next/config';
import { DocumentContext } from 'next/document';

export const determineWhitelabel = (
  ctx: DocumentContext | NextPageContext
): Brand => {
  let brand = Brand.VROOM;

  const headerBrandKey = 'x-brand';
  const brandHeader = ctx.req && ctx.req.headers[headerBrandKey];
  const queryBrand = ctx.query.brand;

  const whitelabel = brandHeader || queryBrand;

  if (whitelabel === Brand.SANTANDER) brand = Brand.SANTANDER;
  else if (whitelabel === Brand.TDA) brand = Brand.TDA;

  return brand;
};
export interface BrandConfig {
  segmentWriteKey?: string;
  brandParam: string;
  title: string;
  description: string;
}
export const returnBrandConfig = (brand: Brand): BrandConfig => {
  const { serverRuntimeConfig } = getConfig();
  let config: BrandConfig = {
    segmentWriteKey: serverRuntimeConfig.SEGMENT_WRITE_KEY,
    brandParam: 'vroom',
    title: 'Vroom: Buy, Sell or Trade-In Used Vehicles Online',
    description:
      'Buy, sell or trade-in your car entirely online, from the comfort of your home. No haggle, no pressure. Easy online financing available. Browse thousands of high-quality cars, and have it delivered straight to you.',
  };
  if (brand === Brand.SANTANDER) {
    config = {
      segmentWriteKey: serverRuntimeConfig.SANTANDER_SEGMENT_WRITE_KEY,
      brandParam: 'santander',
      title: 'Santander Consumer USA: Buy Used Cars, Trucks & SUVs Online',
      description:
        'Buy a used vehicle online from anywhere in the USA. We offer high quality cars, easy car buying, & flexible financing.',
    };
  } else if (brand === Brand.TDA) {
    config = {
      segmentWriteKey: serverRuntimeConfig.TDA_SEGMENT_WRITE_KEY,
      brandParam: 'tda',
      title: 'Texas Direct Auto: Buy, Sell or Trade-In Used Vehicles Online',
      description:
        'Buy, sell or trade-in your car entirely online, from the comfort of your home. No haggle, no pressure. Easy online financing available. Browse thousands of high-quality cars, and have it delivered straight to you.',
    };
  }
  return config;
};
