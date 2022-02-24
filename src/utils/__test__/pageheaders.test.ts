import { returnBrandConfig } from '../pageheaders';

jest.mock('next/config', () => (): unknown => ({
  serverRuntimeConfig: {
    SEGMENT_WRITE_KEY: '12345',
  },
}));

describe('test pageheaders', () => {
  it('test returnBrandConfig ', () => {
    expect(returnBrandConfig()).toEqual({
      segmentWriteKey: '12345',
      segmentData: { app: 'Vroom', page: 'SELL' },
      brandParam: 'vroom',
      title: 'Vroom: Buy, Sell or Trade-In Used Vehicles Online',
      canonical: 'https://www.vroom.com/appraisal',
      description:
        'Get An Instant Price for Your Vehicle: We Pick It Up, Contact Free And You Get Paid. Trade In Your Car Online Without Ever Leaving Your Home. Browse Our Inventory! Buy, Sell or Trade In. Quick & Easy. Get Cash For Your Car. Free Pickup, Contact Free. Free Car Pickup.',
    });
  });
});
