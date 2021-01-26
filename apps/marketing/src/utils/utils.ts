import { Brand } from '@vroom-web/whitelabel';
import { getMetaData } from './MetaData';

export enum PageData {
  CONTACT = 'contact',
  FINANCE = 'finance',
  HOWITWORKS = 'how-it-works',
  REVIEWS = 'reviews',
  SCHEDULE = 'schedule',
}
export interface BrandConfig {
  segmentWriteKey?: string;
  brandParam: string;
  title: string;
  canonical: string;
  description: string;
}
export const returnBrandConfig = (brand: Brand, pageData: PageData): BrandConfig => {
  let {vroom, santander, tda} = getMetaData(pageData);
  let config: BrandConfig = {
    brandParam: 'vroom',
    title: vroom.title,
    canonical: vroom.canonical,
    description: vroom.description,
  };
  if (brand === Brand.SANTANDER) {
    config = {
      brandParam: 'santander',
      title: santander.title,
      canonical: santander.canonical,
      description: santander.description,
    };
  } else if (brand === Brand.TDA) {
    config = {
      brandParam: 'tda',
      title: tda.title,
      canonical: tda.canonical,
      description: tda.description,
    };
  }
  return config;
};
