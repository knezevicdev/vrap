import * as lang from '../LicenseToVinMain.language';

describe('license to vin main language test', () => {
  test('test const', () => {
    expect(lang.licensePlateTabText).toEqual('License Plate');
    expect(lang.vinTabText).toEqual('Vin');
  });
});
