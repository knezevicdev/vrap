import { Brand } from '@vroom-web/whitelabel';
import getConfig from 'next/config';

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
