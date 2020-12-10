import { FooterProps } from 'vroom-ui/dist/elements/Navigation/Footer/types';

import { NextProps } from '../../../modules/congrats/sections/Next';
import { PurchaseSummaryProps } from '../../../modules/congrats/sections/PurchaseSummary/PurchaseSummary';
import { QuestionProps } from '../../../modules/congrats/sections/Questions';
import { ReservedCarProps } from '../../../modules/congrats/sections/ReservedCar';

export const nextViewModel: NextProps = {
  heading: 'what to expect next...',
  steps: [
    {
      number: '1',
      title: 'Finalize Your Purchase',
      description:
        'A Vroom representative will call to discuss terms and finalize your purchase.',
    },
    {
      number: '2',
      title: 'Make It Official',
      description:
        'Vroom will overnight a contract for you to sign and return.',
    },
    {
      number: '3',
      title: 'Home Delivery',
      description: `Get your new ride delivered to your driveway anywhere within the continental U.S.`,
    },
  ],
};

export const questionsViewModel: QuestionProps = {
  phone: {
    href: '+18555241300',
    label: '(855) 524-1300',
  },
};

export const reservedCarViewModel: ReservedCarProps = {
  data: {
    car: '2018 Land Rover Range Rover Sport',
    image: {
      alt: '2018 Land Rover Range Rover Sport',
      src: '/assets/car.png',
    },
    email: 'ph123@gmail.com',
    phoneNumber: '1 (212) 200-1000',
  },
};

export const purchaseSummaryViewModel: PurchaseSummaryProps = {
  purchaseDetails: {
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
  },
  depositInformation: {
    data: {
      amount: '$500.00',
      creditCard: '***1234',
    },
  },
  billingAddress: {
    data: {
      address: {
        name: 'Paul Henry',
        address: '1021 Monterey Salinas Hwy',
        cityStateZip: 'Salina, CA 93980',
      },
    },
  },
  registrationAddress: {
    data: {
      address: {
        name: 'Paul Henry',
        address: '1021 Monterey Salinas Hwy',
        cityStateZip: 'Salina, CA 93980',
      },
    },
  },
  deliveryAddress: {
    data: {
      address: {
        name: 'Paul Henry',
        address: '1021 Monterey Salinas Hwy',
        cityStateZip: 'Salina, CA 93980',
      },
    },
  },
  financingInformation: {
    data: {
      downPayment: '-$5,000',
      bank: 'Chase',
      apr: 'TBD',
      financeTerm: 'TBD',
      numberOfPayments: 'TBD',
      financeCharge: 'TBD',
      monthlyPayment: '$287.00',
    },
  },
  deliveryDetails: {
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
  },
  summary: {
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
  },
};

const sections = [
  {
    title: 'Vroom',
    links: [
      {
        href: '/cars',
        name: 'Buy',
      },
      {
        href: '/sell',
        name: 'Sell/Trade',
      },
      {
        href: '/finance',
        name: 'Finance',
      },
    ],
  },
  {
    title: 'About',
    links: [
      {
        href: '/about',
        name: 'About Us',
      },
      {
        href: '/protection',
        name: 'Vroom Protection',
      },
      {
        href: '/how-it-works',
        name: 'How It Works',
      },
      {
        href: '/reviews',
        name: 'Customer Reviews',
      },
      {
        href: 'https://ir.vroom.com/',
        name: 'Investor Relations',
      },
    ],
  },
  {
    title: 'Contact',
    links: [
      {
        href: 'tel:+18555241300',
        name: '(855) 524-1300',
      },
      {
        href: 'https://vroom.zendesk.com/hc/en-us',
        name: 'FAQ',
      },
      {
        href: '/contact',
        name: 'Contact Us',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        href: '/legal/privacy-policy',
        name: 'Privacy Policy',
      },
      {
        href: '/legal/terms-of-use',
        name: 'Terms of use',
      },
      {
        href: '/careers',
        name: 'Careers',
      },
      {
        href:
          'https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d',
        name: 'Do Not Sell My Info (CA Residents)',
      },
    ],
  },
];

export const footerViewModel: FooterProps = { sections: sections };
