import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from 'vroom-ui/src/foundation/themes/Vroom';

import PurchaseSummary from '../../../../modules/congrats/sections/PurchaseSummary/PurchaseSummary';

const theme = getVroomTheme('/assets/fonts/Vroom');

const purchaseDetails = {
  data: {
    method: 'Finance with Vroom',
    sellingPrice: '$28,750.00',
    taxes: '$2,371.87',
    vehicleServiceContractProtection: '$3,244.00',
    gapCoverage: '$645.00',
    tireAndWheelCoverage: '$643.00',
    shippingFee: '$599.00',
    subtotal: '$22,486.98',
    creditDownPayment: '-$500.00',
    total: '$35,153.98',
  },
};

const depositInformation = {
  data: {
    amount: '$500.00',
    creditCard: '***1234',
  },
};

const billingAddress = {
  data: {
    address: {
      name: 'Paul Henry',
      address: '1021 Monterey Salinas Hwy',
      cityStateZip: 'Salina, CA 93980',
    },
  },
};

const registrationAddress = {
  data: {
    address: {
      name: 'Paul Henry',
      address: '1021 Monterey Salinas Hwy',
      cityStateZip: 'Salina, CA 93980',
    },
  },
};

const deliveryAddress = {
  data: {
    address: {
      name: 'Paul Henry',
      address: '1021 Monterey Salinas Hwy',
      cityStateZip: 'Salina, CA 93980',
    },
  },
};

const financingInformation = {
  data: {
    downPayment: '-$5,000',
    bank: 'Chase',
    apr: 'TBD',
    financeTerm: 'TBD',
    numberOfPayments: 'TBD',
    financeCharge: 'TBD',
    monthlyPayment: '$287.00',
  },
};

const deliveryDetails = {
  data: {
    dates: ['04/01/2020', '04/02/2020'],
    receiver: {
      name: 'Michelle Henry',
      phone: '(855) 523-1302',
    },
    truckInformation:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia',
  },
  willYouBeAvailableLabel: 'No',
  truckHasAccessLabel: 'No',
  showReceiverInformation: true,
  showNotAvailableDates: true,
  showTruckInformation: true,
};

const summary = {
  date: 'November 4, 2020',
  car: {
    image: {
      src: '',
      alt: 'car',
    },
    yearMakeAndModel: '2018 Land Rover Range Rover Sport',
    trim: 'SE',
    miles: '20,818 miles',
  },
};

export const Success = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <PurchaseSummary
        summary={summary}
        purchaseDetails={purchaseDetails}
        depositInformation={depositInformation}
        billingAddress={billingAddress}
        financingInformation={financingInformation}
        registrationAddress={registrationAddress}
        deliveryAddress={deliveryAddress}
        deliveryDetails={deliveryDetails}
      />
    </ThemeProvider>
  );
};

Success.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=385%3A365',
  },
};

export default {
  title: 'Checkout/Congrats/Sections/Purchase Summary',
  decorators: [withDesign],
};
