import { Body, Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';

import CheckoutLayout from 'src/modules/common/CheckoutLayout';
import { DealContext } from 'src/modules/store/DealStore';
import { GQLTypes } from '@vroom-web/networking';

export const Default = (): JSX.Element => {
  const steps = [
    'Trade-In Info',
    'Your Info',
    'Payment Details',
    'Finalize Purchase',
    'Deposit',
    'Additional Docs',
  ];

  const deal = {
    accountID: 9586,
    dealID: 1,
    createdAt: '2020-09-09T16:41:03Z',
    TradeIns: [
      {
        year: 2019,
        make: 'Mazda',
        model: 'CX-5',
        offerPrice: 16856.742447428405,
        loanPayoff: 10006.815813388675,
        makingLoanPayoff: true,
      },
    ],
    dealSummary: {
      accountInfo: {
        userName: 'Gage_Schumm@Alvina.net',
        firstName: 'Ervin',
        middleName: 'Candace',
        lastName: 'Gerlach',
        phone: '123-246-5601',
      },
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
      deliveryAddress: {
        firstName: 'Penelope',
        lastName: 'Brown',
        streetLine1: '01 Witting Mission',
        streetLine2: 'Suite 859',
        city: 'West Laury',
        state: 'HI',
        postCode: '91570',
      },
      amountDue: {
        subTotal: 18091.376311585307,
        totalBalanceDue: 38630.07804329693,
        cashDownPayment: 20016.505559414625,
        taxableAmount: 27337.186224266887,
        totalTaxesAndFees: 17937.79811772704,
        shippingFee: 33771.78910139203,
        tradeIn: {
          value: 3521.5644950512797,
          loanPayoff: 6341.355780605227,
          netBalance: 3730.0545484758914,
          totalDownPayment: 2855.4517729207873,
        },
      },
      dateCompleted: null,
      deliveryDetails: {
        wheelerTruck: true,
        availableForDelivery: true,
        additionalDetails: null,
        unavailableDates: null,
        alternateContact: {
          first: 'Marjorie',
          last: 'Larson',
          phone: '788-556-0315',
        },
      },
      documents: [
        {
          fileType: 'drivers-license-back',
          fileID: '996a4d61-8056-41ca-b359-49c5a94476c2',
        },
        {
          fileType: 'drivers-license-front',
          fileID: 'f3173f46-2107-49e7-9a94-b72cfe6cb402',
        },
        {
          fileType: 'insurance',
          fileID: '146a8d57-47f4-424e-9656-2b93284a85a1',
        },
      ],
      inventory: {
        id: '362',
        miles: 67908,
        leadPhotoURL: 'https://source.unsplash.com/random/800x600/?automovil',
        pricing: {
          listPrice: 10804,
        },
        vehicle: {
          vin: '4S4BSAFC1J3359282',
          year: 2018,
          make: 'Subaru',
          model: 'Outback',
          trim: '2.5i Premium',
        },
      },
      depositPaymentInfo: {
        HoldPlaced: true,
        LastFourDigits: 3323,
        ChargeAmount: 16870,
      },
      registrationAddress: {
        firstName: 'Ervin',
        lastName: 'Gerlach',
        streetLine1: '69 Wiley Vista Apt. 789',
        streetLine2: 'Suite 960',
        city: 'South Johathanstad',
        state: 'Armand Prairie',
        postCode: '97673',
      },
      billingAddress: {
        firstName: 'Ervin',
        lastName: 'Gerlach',
        streetLine1: '9572 Luna River',
        streetLine2: 'Apt. 608',
        city: 'East Rachelfort',
        state: 'Richard Unions',
        postCode: '74919-9449',
      },
      financing: null,
      additionalProducts: {
        VRTX: [
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
          {
            id: '40d57597-16e7-4b07-bd02-ed445b659177',
            selected: false,
            planCode: 'TW',
            name: 'Tire and Wheel',
            summary: '36 months',
            cost: 452,
            months: 36,
            miles: 0,
            deductible: 0,
            dealerCost: 78,
            maxTerm: 36,
            planSku: 174129,
            productCode: 'VRTW',
            retailRate: 328,
          },
          {
            id: 'ceed0a8e-4742-4b0f-8d91-c312811fb32f',
            selected: false,
            planCode: 'TW',
            name: 'Tire and Wheel',
            summary: '48 months',
            cost: 456,
            months: 48,
            miles: 0,
            deductible: 0,
            dealerCost: 82,
            maxTerm: 48,
            planSku: 174130,
            productCode: 'VRTW',
            retailRate: 332,
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
          {
            id: 'ebc0a014-9f34-42b1-9091-33445b836b69',
            selected: false,
            planCode: 'VSCPLAT',
            name: 'Vehicle Service Contract (VSC)',
            summary: '36 months / 36000 miles / 100 deductible',
            cost: 1613,
            months: 36,
            miles: 36000,
            deductible: 100,
            dealerCost: 763,
            maxTerm: 36,
            planSku: 174156,
            productCode: 'VRVS',
            retailRate: 1513,
          },
          {
            id: '4ec7db13-62e1-4ead-a6fc-7624b3180e31',
            selected: false,
            planCode: 'VSCPLAT',
            name: 'Vehicle Service Contract (VSC)',
            summary: '48 months / 48000 miles / 100 deductible',
            cost: 1804,
            months: 48,
            miles: 48000,
            deductible: 100,
            dealerCost: 954,
            maxTerm: 48,
            planSku: 174157,
            productCode: 'VRVS',
            retailRate: 1704,
          },
        ],
      },
    },
  } as GQLTypes.Deal;

  const fakeData = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
      hendrerit ligula. Morbi sit amet sagittis massa. Morbi in mollis lectus,
      eleifend mattis tellus. Aliquam erat volutpat. Etiam id magna et nunc
      consectetur tincidunt. Morbi rutrum felis sit amet magna rutrum egestas.
      Sed dictum dignissim posuere. Sed tempus posuere lectus, at placerat
      sapien convallis et. Curabitur felis arcu, dictum eget diam sodales,
      viverra scelerisque eros.`;

  return (
    <DealContext.Provider value={{ steps: steps, activeStep: 2, deal: deal }}>
      <CheckoutLayout>
        <Heading.Four>Test Data</Heading.Four>
        <hr />
        {[...Array(2)].map((i: number) => (
          <div key={i}>
            <Body.Regular>{fakeData}</Body.Regular>
            <hr />
          </div>
        ))}
      </CheckoutLayout>
    </DealContext.Provider>
  );
};

export default {
  title: 'Checkout/CheckoutLayout',
};
