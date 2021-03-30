import { ExperimentSDK } from '@vroom-web/experiment-sdk';
import { Car } from '@vroom-web/inv-search-networking';
import { action, makeAutoObservable } from 'mobx';

import { analyticsHandler, Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

interface List {
  header: string;
  extra: string;
}

class PriceViewModel {
  inventoryStore: InventoryStore;
  private readonly car: Car;
  readonly price: string;
  readonly title: string = 'Pricing';
  showVisibleShippingFee = false;
  readonly list: List = {
    header: 'Price displayed <bold>does not</bold> include:',
    extra:
      'We make every effort to provide accurate vehicle information on this page, but please verify before purchasing.',
  };

  constructor(inventoryStore: InventoryStore) {
    this.inventoryStore = inventoryStore;
    this.price = inventoryStore.vehicle._source.listingPrice.toLocaleString(
      'en-US'
    );
    this.car = inventoryStore.vehicle._source;
    new ExperimentSDK()
      .getAndLogExperimentClientSide('snd-pdp-visible-shipping-fee')
      .then((experiment) => {
        if (experiment) {
          this.setShowVisibleShippingFee(experiment.assignedVariant === 1);
          analyticsHandler.registerExperiment(experiment);
        }
      });
    makeAutoObservable(this);
  }

  @action
  setShowVisibleShippingFee(isVisible: boolean): void {
    this.showVisibleShippingFee = isVisible;
  }

  getListBullets(): string[] {
    return [
      'Pre-delivery service charges of $285.50 (MA residents $385.50)',
      `Delivery fee of $${this.inventoryStore.deliveryFee}`,
      'FL, NJ and NY residents only - Electronic registration filing charge of $15.00',
      'Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
    ];
  }

  showShippingFee(): boolean {
    return (
      this.showVisibleShippingFee &&
      (this.inventoryStore.deliveryFeeHasFailed ||
        this.inventoryStore.deliveryFeeHasSucceeded)
    );
  }

  getShippingFee(): string {
    return `$${this.inventoryStore.deliveryFee} Shipping`;
  }

  trackToolTipClick(): void {
    const {
      inventoryId: sku,
      make,
      model,
      year,
      vin,
      listingPrice: price,
      consignmentPartnerId: partnerId,
    } = this.car;
    const name = `${year} ${make} ${model}`;
    const product: Product = {
      inventoryType: partnerId ? 'Consignment' : 'Vroom',
      make,
      model,
      year,
      vin,
      price,
      sku,
      name,
    };
    analyticsHandler.trackToolTipClicked(product);
  }
}

export default PriceViewModel;
