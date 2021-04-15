import { GQLTypes } from '@vroom-web/networking';

import {
  DealProps,
  DealSummaryProps,
  DealTradeProps,
  FinancingProps,
  VehicleProps,
} from 'src/modules/deals/sections/DealSummary/types';

export const vehicle: VehicleProps = {
  listingPrice: 14840,
  vehicle: { year: 2017, make: 'Alfa Romeo', model: 'Giulia' },
  trim: 'SE',
  miles: 11540,
  leadPhotoURL:
    'https://cdn.spincar.com/swipetospin-viewers/vroomadesaatlanta/jthbw1gg0h2142332/20201203212657.Z81AZWJL/closeups/cu-0.jpg',
};

export const vehicleInvSearch = {
  listingPrice: 14840,
  year: 2017,
  make: 'Alfa Romeo',
  model: 'Giulia',
  trim: 'SE',
  miles: 11540,
  leadPhotoUrl:
    'https://cdn.spincar.com/swipetospin-viewers/vroomadesaatlanta/jthbw1gg0h2142332/20201203212657.Z81AZWJL/closeups/cu-0.jpg',
} as GQLTypes.InvSearchVehicleData;

export const partialDeal: DealProps = {
  method: 'TBD',
  taxes: 200.09,
  shippingFee: 599,
  subtotal: 14433.09,
  depositCaptured: false,
};

export const partialTrades: DealTradeProps = {
  vehicle: {
    make: 'Subaru',
    model: 'Impreza',
    year: 2017,
  },
  credit: 2000,
};

export const financing: FinancingProps = {
  downPayment: 12300,
  bank: 'Vroom Financial Services',
  apr: 0.02,
  financeTerm: 36,
  numberOfPayments: 36,
  amountFinanced: 13854.36,
  financeCharge: 443.23,
  monthlyPayment: 397.16,
};

export const initialProps: DealSummaryProps = {
  vehicle: vehicle,
  deal: partialDeal,
};

export const propsWithAdditionalProductsSelected: DealSummaryProps = {
  vehicle: vehicle,
  deal: {
    ...partialDeal,
    method: 'Pay with cash',
    additionalProducts: {
      vehicleServiceProtection: {
        cost: 3244,
        summary: '24 months / 24000 miles / 100 deductible',
      },
      gapCoverage: {
        cost: 645,
        summary: '24 months',
      },
      tireAndWheelCoverage: {
        cost: 653,
        summary: '36 months',
      },
    },
  },
};

export const propsWithAdditionalProductsNotSelected: DealSummaryProps = {
  vehicle: vehicle,
  deal: {
    ...partialDeal,
    method: 'Finance with Vroom',
    additionalProducts: {
      vehicleServiceProtection: undefined,
      tireAndWheelCoverage: undefined,
    },
  },
};

export const propsWithTradeNoBalance: DealSummaryProps = {
  vehicle: vehicle,
  deal: partialDeal,
  trades: partialTrades,
};

export const propsWithTrade: DealSummaryProps = {
  vehicle: vehicle,
  deal: partialDeal,
  trades: {
    ...partialTrades,
    loanBalance: 1236,
  },
};

export const propsWithFinancing: DealSummaryProps = {
  vehicle: vehicle,
  deal: {
    ...partialDeal,
    method: 'Finance with Vroom',
    additionalProducts: {
      vehicleServiceProtection: {
        cost: 3244,
        summary: '24 months / 24000 miles / 100 deductible',
      },
      tireAndWheelCoverage: undefined,
    },
    financing: financing,
  },
};

export const propsWhenDepositCaptured: DealSummaryProps = {
  vehicle: vehicle,
  deal: {
    ...partialDeal,
    method: 'Finance with Vroom',
    additionalProducts: {
      vehicleServiceProtection: {
        cost: 3244,
        summary: '24 months / 24000 miles / 100 deductible',
      },
      tireAndWheelCoverage: undefined,
    },
    depositCaptured: true,
  },
};
