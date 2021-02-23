import { GQLTypes } from '@vroom-web/networking';

import {
  DealProps,
  DealTradeProps,
  FinancingProps,
  FniProducts,
  VehicleProps,
} from './types';

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

export default class ViewModel {
  deal: GQLTypes.Deal;

  constructor(deal: GQLTypes.Deal) {
    this.deal = deal;
  }

  get dealProps(): DealProps {
    return {
      method: this.paymentMethod,
      taxes: this.amountDue.totalTaxesAndFees,
      additionalProducts: this.additionalProductsProps,
      financing: this.financingProps,
      shippingFee: this.amountDue.shippingFee,
      subtotal: this.amountDue.subTotal,
      depositCaptured: this.deposit.DepositCaptured,
    };
  }

  get vehicleProps(): VehicleProps {
    const { trim } = this.vehicle;
    const { leadPhotoURL, miles } = this.inventory;
    return {
      listingPrice: this.pricing.listPrice,
      vehicle: this.vehicle,
      miles,
      leadPhotoURL,
      trim,
    };
  }

  get tradeProps(): DealTradeProps | undefined {
    return this.hasTradeIn
      ? {
          vehicle: this.tradeIn,
          credit: this.tradeIn.offerPrice,
          loanBalance: this.tradeIn.loanPayoff,
        }
      : undefined;
  }

  private get financingProps(): FinancingProps | undefined {
    if (this.financing) {
      const {
        downPayment,
        lenderName,
        apr,
        termMonths,
        financeCharge,
        monthlyPayment,
        amountFinanced,
      } = this.financingPricingStack;

      return {
        downPayment,
        bank: lenderName,
        apr,
        financeTerm: termMonths,
        numberOfPayments: termMonths,
        financeCharge,
        monthlyPayment,
        amountFinanced,
      };
    } else {
      return undefined;
    }
  }

  private get additionalProductsProps(): FniProducts | undefined {
    if (!this.additionalProducts) return undefined;

    const fniProducts: FniProducts = {};

    if (this.vehicleServiceProtection) {
      const { cost, summary } = this.vehicleServiceProtection;
      fniProducts.vehicleServiceProtection = {
        cost,
        summary,
      };
    }

    if (this.tireAndWheelCoverage) {
      const { cost, summary } = this.tireAndWheelCoverage;
      fniProducts.tireAndWheelCoverage = {
        cost,
        summary,
      };
    }

    if (this.gapCoverage) {
      const { cost, summary } = this.gapCoverage;
      fniProducts.gapCoverage = {
        cost,
        summary,
      };
    }
    return fniProducts;
  }

  private get summary(): GQLTypes.DealSummary {
    return this.deal.dealSummary as GQLTypes.DealSummary;
  }

  private get inventory(): GQLTypes.Inventory {
    return this.summary.inventory as GQLTypes.Inventory;
  }

  private get pricing(): GQLTypes.Pricing {
    return this.inventory.pricing as GQLTypes.Pricing;
  }

  private get financing(): GQLTypes.Financing | undefined {
    return this.summary.financing || undefined;
  }

  private get financingPricingStack(): GQLTypes.LoanPricingStack {
    return (this.financing as GQLTypes.Financing)
      .pricingStack as GQLTypes.LoanPricingStack;
  }

  private get deposit(): GQLTypes.DepositPayment {
    return this.summary.depositPaymentInfo as GQLTypes.DepositPayment;
  }

  private get amountDue(): GQLTypes.AmountDue {
    return this.summary.amountDue as GQLTypes.AmountDue;
  }

  private get tradeIns(): GQLTypes.TradeIn[] | null | undefined {
    return this.deal.TradeIns;
  }

  private get additionalProducts():
    | { [service: string]: Service[] }
    | undefined {
    return this.summary.additionalProducts;
  }

  private get vehicleServiceProtection(): Service | undefined {
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

  private get paymentMethod(): string {
    const method = this.summary.paymentType as string;
    if (method === 'Financing') return 'Finance with Vroom';
    if (method === 'Cash') return 'Pay with cash';
    if (method === 'OSF') return 'Finance with your bank';

    return 'TBD';
  }

  private get hasTradeIn(): boolean {
    return this.tradeIns ? this.tradeIns.length > 0 : false;
  }

  private get tradeIn(): GQLTypes.TradeIn {
    return (this.tradeIns as Array<GQLTypes.TradeIn>)[0];
  }
}
