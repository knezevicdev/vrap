import { Car } from '@vroom-web/inv-search-networking';
import React from 'react';

import { analyticsHandler, Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';
import { Status } from 'src/networking/types';

class SimilarVehiclesViewModel {
  private store: InventoryStore;
  readonly title: string = 'Similar Vehicles';
  readonly viewAllCars: string = 'View All Cars';
  readonly viewAll: string = 'VIEW ALL';
  readonly similarVehicleCount = 4;

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  private trackProductList(cars: Car[]): void {
    const products: Product[] = cars.map((car, index) => {
      const {
        consignmentPartnerId,
        inventoryId,
        leadFlagPhotoUrl,
        listingPrice,
        make,
        makeSlug,
        model,
        modelSlug,
        soldStatus,
        vin,
        year,
        vinClusterPrimary,
        vinClusterSecondary,
      } = car;
      const name = `${year} ${make} ${model}`;
      const url = `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}`;
      return {
        imageUrl: leadFlagPhotoUrl,
        inventoryType: consignmentPartnerId ? 'Consignment' : 'Vroom',
        make,
        model,
        name,
        partnerId: consignmentPartnerId,
        position: index,
        price: listingPrice,
        sku: inventoryId,
        soldStatus,
        url,
        vin,
        year,
        vinClusterPrimary,
        vinClusterSecondary,
      };
    });

    analyticsHandler.trackProductListViewed(products);
  }

  loading(): boolean {
    const result =
      this.store.similarStatus === Status.FETCHING ||
      this.store.similarStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.similarStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    const loading = this.loading();
    return !loading && this.store.similarStatus === Status.ERROR;
  }

  getCars = (): Car[] => {
    try {
      const similarCars = this.store.similar
        .slice(0, this.similarVehicleCount)
        .map((car) => car._source);
      this.trackProductList(similarCars);
      return similarCars;
    } catch {
      return [];
    }
  };

  handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    window.location.href = '/cars';
  }
}

export default SimilarVehiclesViewModel;
