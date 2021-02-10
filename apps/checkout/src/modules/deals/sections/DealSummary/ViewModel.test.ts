import { GQLTypes } from '@vroom-web/networking';

import mockDeal from './mockDeal.json';
import ViewModel from './ViewModel';

describe('DealSummary View Model test', () => {
  const deal = mockDeal as GQLTypes.Deal;
  const viewModel = new ViewModel(deal);

  it('should generate dealProps, vehicleProps, tradeProps as expected', () => {
    const { dealProps, vehicleProps, tradeProps } = viewModel;
    expect(dealProps).toEqual({
      method: 'Pay with cash',
      taxes: 32329.102828606963,
      additionalProducts: {
        vehicleServiceProtection: {
          cost: 1447,
          summary: '24 months / 24000 miles / 100 deductible',
        },
        tireAndWheelCoverage: {
          cost: 414,
          summary: '24 months',
        },
      },
      financing: undefined,
      shippingFee: 44580.589988708496,
      subtotal: 31303.586046651006,
      depositCaptured: undefined,
    });
    expect(vehicleProps).toEqual({
      listingPrice: 6652,
      vehicle: {
        vin: '4S4BSAFC1J3359282',
        year: 2018,
        make: 'Subaru',
        model: 'Outback',
        trim: '2.5i Premium',
      },
      miles: 66158,
      leadPhotoURL: 'https://source.unsplash.com/random/800x600/?automovil',
      trim: '2.5i Premium',
    });
    expect(tradeProps).toEqual({
      vehicle: {
        year: 2019,
        make: 'Mazda',
        model: 'CX-5',
        offerPrice: 19350.43155886233,
        loanPayoff: 17011.596130393445,
        makingLoanPayoff: true,
      },
      credit: 19350.43155886233,
      loanBalance: 17011.596130393445,
    });
  });
});
