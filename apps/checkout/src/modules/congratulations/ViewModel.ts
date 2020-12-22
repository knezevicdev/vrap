import { GQLTypes, Status } from '@vroom-web/networking';
import { FooterProps } from 'vroom-ui';

import Model from './Model';
import { NextProps } from './sections/Next';
import { PurchaseSummaryProps } from './sections/PurchaseSummary/PurchaseSummary';
import { QuestionProps } from './sections/Questions';
import { ReservedCarProps } from './sections/ReservedCar';

enum ServiceType {
  Vehicle = 'VRVS',
  TireAndWheel = 'VRTW',
  Gap = 'VRGP',
}

interface Service {
  selected: boolean;
  cost: number;
  summary: string;
}

export default class CongratsViewModel {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  private get summary(): GQLTypes.DealSummary {
    return (this.model.data.user.deals as Array<GQLTypes.Deal>)[0].dealSummary;
  }

  private get account(): GQLTypes.Account {
    return this.summary.accountInfo as GQLTypes.Account;
  }

  private get inventory(): GQLTypes.Inventory {
    return this.summary.inventory as GQLTypes.Inventory;
  }

  private get pricing(): GQLTypes.Pricing {
    return this.inventory.pricing as GQLTypes.Pricing;
  }

  private get financing(): GQLTypes.Financing | undefined {
    return this.summary.financing ? this.summary.financing : undefined;
  }

  private get financingPricingStack(): GQLTypes.LoanPricingStack {
    return (this.financing as GQLTypes.Financing)
      .pricingStack as GQLTypes.LoanPricingStack;
  }

  private get deliveryDetails(): GQLTypes.DeliveryDetails {
    return this.summary.deliveryDetails as GQLTypes.DeliveryDetails;
  }

  private get alternateContact(): GQLTypes.PointOfContact {
    return this.deliveryDetails.alternateContact as GQLTypes.PointOfContact;
  }

  private get deposit(): GQLTypes.DepositPayment {
    return this.summary.depositPaymentInfo as GQLTypes.DepositPayment;
  }

  private get billingAddress(): GQLTypes.AddressDto {
    return this.summary.billingAddress as GQLTypes.AddressDto;
  }

  private get deliveryAddress(): GQLTypes.AddressDto {
    return this.summary.deliveryAddress as GQLTypes.AddressDto;
  }

  private get registrationAddress(): GQLTypes.AddressDto {
    return this.summary.registrationAddress as GQLTypes.AddressDto;
  }

  private get amountDue(): GQLTypes.AmountDue {
    return this.summary.amountDue as GQLTypes.AmountDue;
  }

  private get additionalProducts():
    | { [service: string]: Service[] }
    | undefined {
    return this.summary.additionalProducts;
  }

  private get vehicleServiceContractProtection(): Service | undefined {
    const service = this.additionalProducts
      ? this.additionalProducts[ServiceType.Vehicle]
      : undefined;
    if (service) {
      return service.find((service) => service.selected);
    }
    return undefined;
  }

  private get tireAndWheelCoverage(): Service | undefined {
    const service = this.additionalProducts
      ? this.additionalProducts[ServiceType.TireAndWheel]
      : undefined;
    if (service) {
      return service.find((service) => service.selected);
    }
    return undefined;
  }

  private get gapCoverage(): Service | undefined {
    const service = this.additionalProducts
      ? this.additionalProducts[ServiceType.Gap]
      : undefined;
    if (service) {
      return service.find((service) => service.selected);
    }
    return undefined;
  }

  private get vehicle(): GQLTypes.VehicleInventory {
    return this.inventory.vehicle as GQLTypes.VehicleInventory;
  }

  private get error(): boolean {
    return this.model.dataStatus === Status.ERROR;
  }

  private get empty(): boolean {
    if (this.model.dataStatus !== Status.SUCCESS) {
      return false;
    }
    if (!this.model.data.user.deals) {
      return true;
    }
    return this.model.data.user.deals.length === 0;
  }

  private get showNotAvailableDates(): boolean {
    if (this.deliveryDetails.unavailableDates) {
      return this.deliveryDetails.unavailableDates.length > 0;
    }
    return false;
  }

  private get paymentMethod(): string {
    const method = this.summary.paymentType as string;
    if (method === 'Financing') return 'Finance with Vroom';
    if (method === 'Cash') return 'Pay with cash';
    if (method === 'OSF') return 'Finance with your bank';

    return '';
  }

  get showLoading(): boolean {
    return this.model.dataStatus === Status.LOADING;
  }

  get showError(): boolean {
    return this.empty || this.error;
  }

  get showSuccess(): boolean {
    return !this.empty && !this.error && !this.showLoading;
  }

  get reservedCarProps(): ReservedCarProps {
    const { year, make, model, trim } = this.vehicle;
    const { leadPhotoURL } = this.inventory;
    const car = `${year} ${make} ${model} ${trim}`;
    const src = leadPhotoURL ? leadPhotoURL : '';

    return {
      data: {
        car: car,
        email: this.account.userName,
        phoneNumber: this.account.phone,
        image: {
          alt: car,
          src: src,
        },
      },
    };
  }

  get nextProps(): NextProps {
    return {
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
  }

  get purchaseSummaryProps(): PurchaseSummaryProps {
    const { year, make, model, trim } = this.vehicle;
    const { leadPhotoURL, miles } = this.inventory;
    const car = `${year} ${make} ${model}`;
    const src = leadPhotoURL ? leadPhotoURL : '';
    const milesFormatted = `${miles ? miles.toLocaleString() : ''} miles`;

    const { LastFourDigits, ChargeAmount } = this.deposit;

    const hasInsuranceCard = (
      documents: Array<GQLTypes.DocumentMetadata>
    ): boolean => {
      const card = documents.find(
        (document) => document.fileType === 'insurance'
      );
      return !!card;
    };

    const showInsuranceDisclaimer = this.summary.documents
      ? !hasInsuranceCard(this.summary.documents)
      : true;

    return {
      summary: {
        date: new Date(this.summary.dateCompleted).toDateString(),
        car: {
          image: {
            alt: car,
            src: src,
          },
          yearMakeAndModel: car,
          trim: trim,
          miles: milesFormatted,
        },
      },
      purchaseDetails: {
        data: {
          method: this.paymentMethod,
          sellingPrice: `$${this.pricing.listPrice.toLocaleString()}`,
          taxes: `$${this.amountDue.totalTaxesAndFees.toLocaleString()}`,
          vehicleServiceContractProtection: this
            .vehicleServiceContractProtection
            ? {
                cost: `$${this.vehicleServiceContractProtection.cost.toLocaleString()}`,
                summary: this.vehicleServiceContractProtection.summary,
              }
            : undefined,
          gapCoverage: this.gapCoverage
            ? {
                cost: `$${this.gapCoverage.cost.toLocaleString()}`,
                summary: this.gapCoverage.summary,
              }
            : undefined,
          tireAndWheelCoverage: this.tireAndWheelCoverage
            ? {
                cost: `$${this.tireAndWheelCoverage.cost.toLocaleString()}`,
                summary: this.tireAndWheelCoverage.summary,
              }
            : undefined,
          shippingFee: `$${this.amountDue.shippingFee.toLocaleString()}`,
          subtotal: `$${this.amountDue.subTotal.toLocaleString()}`,
          creditDownPayment: `-$${this.amountDue.cashDownPayment.toLocaleString()}`,
          total: `$${this.amountDue.totalBalanceDue.toLocaleString()}`,
        },
      },
      depositInformation: {
        data: {
          amount: `${ChargeAmount}`,
          creditCard: `***${LastFourDigits}`,
        },
      },
      billingAddress: {
        data: {
          address: {
            name: `${this.billingAddress.firstName} ${this.billingAddress.lastName}`,
            address: this.billingAddress.streetLine1,
            cityStateZip: `${this.billingAddress.city}, ${this.billingAddress.state} ${this.billingAddress.postCode}`,
          },
        },
      },
      registrationAddress: {
        data: {
          address: {
            name: `${this.registrationAddress.firstName} ${this.registrationAddress.lastName}`,
            address: this.registrationAddress.streetLine1,
            cityStateZip: `${this.registrationAddress.city}, ${this.registrationAddress.state} ${this.registrationAddress.postCode}`,
          },
        },
      },
      deliveryAddress: {
        data: {
          address: {
            name: `${this.deliveryAddress.firstName} ${this.deliveryAddress.lastName}`,
            address: this.deliveryAddress.streetLine1,
            cityStateZip: `${this.deliveryAddress.city}, ${this.deliveryAddress.state} ${this.deliveryAddress.postCode}`,
          },
        },
      },
      financingInformation: this.financing
        ? {
            data: {
              downPayment: `-$${this.financingPricingStack.downPayment}`,
              bank: this.financingPricingStack.lenderName,
              apr: `${(this.financingPricingStack.apr * 100).toFixed(2)}%`,
              financeTerm: this.financingPricingStack.buyRate.toString(),
              numberOfPayments: this.financingPricingStack.termMonths.toString(),
              financeCharge: `$${this.financingPricingStack.financeCharge}`,
              monthlyPayment: `$${this.financingPricingStack.monthlyPayment}`,
            },
          }
        : undefined,
      deliveryDetails: {
        data: {
          dates: this.deliveryDetails.unavailableDates
            ? this.deliveryDetails.unavailableDates
            : undefined,
          receiver:
            this.deliveryDetails.availableForDelivery === false
              ? {
                  name: `${this.alternateContact.first} ${this.alternateContact.last}`,
                  phone: this.alternateContact.phone,
                }
              : undefined,
          truckInformation: this.deliveryDetails.additionalDetails as string,
        },
        willYouBeAvailableLabel: this.deliveryDetails.availableForDelivery
          ? 'Yes'
          : 'No',
        truckHasAccessLabel: this.deliveryDetails.wheelerTruck ? 'Yes' : 'No',
        showReceiverInformation:
          this.deliveryDetails.availableForDelivery === false,
        showNotAvailableDates: this.showNotAvailableDates,
        showTruckInformation: !this.deliveryDetails.wheelerTruck,
      },
      showInsuranceDisclaimer: showInsuranceDisclaimer,
    };
  }

  //TODO: Inject correct number
  get questionsProps(): QuestionProps {
    return {
      phone: {
        href: '+18555241300',
        label: '(855) 524-1300',
      },
    };
  }

  //TODO: Inject correct contact number
  get footerProps(): FooterProps {
    return {
      sections: [
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
      ],
    };
  }
}
