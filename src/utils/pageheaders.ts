import getConfig from 'next/config';

export enum SegmentAppName {
  VROOM = 'Vroom',
}

export enum SegmentPageName {
  SELL = 'SELL',
}

export interface BrandConfig {
  segmentWriteKey?: string;
  segmentData?: { app: SegmentAppName; page: SegmentPageName };
  brandParam: string;
  title: string;
  canonical: string;
  description: string;
}

export const returnBrandConfig = (): BrandConfig => {
  const { serverRuntimeConfig } = getConfig();

  const config: BrandConfig = {
    segmentWriteKey: serverRuntimeConfig.SEGMENT_WRITE_KEY,
    segmentData: { app: SegmentAppName.VROOM, page: SegmentPageName.SELL },
    brandParam: 'vroom',
    title: 'Vroom: Buy, Sell or Trade-In Used Vehicles Online',
    canonical: 'https://www.vroom.com/appraisal',
    description:
      'Get An Instant Price for Your Vehicle: We Pick It Up, Contact Free And You Get Paid. Trade In Your Car Online Without Ever Leaving Your Home. Browse Our Inventory! Buy, Sell or Trade In. Quick & Easy. Get Cash For Your Car. Free Pickup, Contact Free. Free Car Pickup.',
  };
  return config;
};
