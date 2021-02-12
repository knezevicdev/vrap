import { GQLTypes } from '@vroom-web/networking';

import { DealState } from 'src/core/store/DealStore';
import { VehicleProps } from 'src/modules/deals/sections/DealSummary/types';

const mockVehicle: VehicleProps = {
  vehicle: { year: 2018, make: 'Jeep', model: 'Wrangler JK Unlimited' },
  listingPrice: 30980,
  trim: 'Sport',
  miles: 27849,
  leadPhotoURL: 'https://source.unsplash.com/random/800x600/?jeep',
};

const mockDeal = {
  accountID: 9586,
  dealID: 1,
  createdAt: '2020-09-09T16:41:03Z',
  TradeIns: [
    {
      year: 2015,
      make: 'Chrysler',
      model: 'Pacifica Hybrid',
      offerPrice: 16856.742447428405,
      loanPayoff: 10006.815813388675,
      makingLoanPayoff: true,
    },
  ],
  dealSummary: {
    dealStatus: {
      step: 'DocumentUpload',
      status: 'In-Progress',
      interestedInTrade: true,
      canBeCancelled: false,
      pastSteps: [
        'RegistrationAddress',
        'DeliveryAddress',
        'PaymentType',
        'BackendProducts',
        'DepositPaymentInfo',
      ],
    },
    paymentType: 'Cash',
    amountDue: {
      subTotal: 18091.376311585307,
      totalBalanceDue: 38630.07804329693,
      cashDownPayment: 20016.505559414625,
      taxableAmount: 27337.186224266887,
      totalTaxesAndFees: 17937.79811772704,
      shippingFee: 599,
      tradeIn: {
        value: 3521.5644950512797,
        loanPayoff: 6341.355780605227,
        netBalance: 3730.0545484758914,
        totalDownPayment: 2855.4517729207873,
      },
    },
    inventory: {
      id: '362',
      miles: 27849,
      leadPhotoURL: 'https://source.unsplash.com/random/800x600/?jeep',
      pricing: {
        listPrice: 30980,
      },
      vehicle: {
        vin: '4S4BSAFC1J3359282',
        year: 2018,
        make: 'Jeep',
        model: 'Wrangler JK Unlimited',
        trim: 'Sport',
      },
    },
    depositPaymentInfo: {
      HoldPlaced: true,
      LastFourDigits: 3323,
      ChargeAmount: 16870,
    },
    financing: {
      pricingStack: {
        downPayment: 14300,
        lenderName: 'Vroom Financial Services',
        apr: 0.02,
        termMonths: 36,
        financeCharge: 443.23,
        monthlyPayment: 397.16,
        amountFinanced: 13854.36,
      },
    },
    additionalProducts: {
      VRTW: [
        {
          id: '1d947f83-2998-4cce-9fc4-dec7d2bf069c',
          selected: true,
          planCode: 'TW',
          name: 'Tire and Wheel',
          summary: '24 months',
          cost: 414,
          months: 24,
          miles: 0,
          deductible: 0,
          dealerCost: 40,
          maxTerm: 24,
          planSku: 174128,
          productCode: 'VRTW',
          retailRate: 290,
        },
      ],
      VRVS: [
        {
          id: '15932de2-222a-4ab2-a297-86558c06c780',
          selected: true,
          planCode: 'VSCPLAT',
          name: 'Vehicle Service Contract (VSC)',
          summary: '24 months / 24000 miles / 100 deductible',
          cost: 1447,
          months: 24,
          miles: 24000,
          deductible: 100,
          dealerCost: 597,
          maxTerm: 24,
          planSku: 174155,
          productCode: 'VRVS',
          retailRate: 1347,
        },
      ],
    },
  },
} as GQLTypes.Deal;

export const dealState: DealState = {
  activeStep: 4,
  showDropdown: false,
  deal: mockDeal,
  vehicle: mockVehicle,
};
