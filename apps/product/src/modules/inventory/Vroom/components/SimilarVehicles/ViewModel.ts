import { Car } from '@vroom-web/inv-search-networking';
import Router from 'next/router';
import React from 'react';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';
import { Status } from 'src/networking/types';

class SimilarVehiclesViewModel {
  private store: InventoryStore;
  private analyticsHandler: AnalyticsHandler;
  readonly title: string = 'Similar Vehicles';
  readonly viewAllCars: string = 'View All Cars';
  readonly viewAll: string = 'VIEW ALL';

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
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
      } = car;
      const name = `${year} ${make} ${model}`;
      //TODO: Replace vehicle -> inventory after AB test
      const url = `/vehicle/${makeSlug}-${modelSlug}-${year}-${vin}`;
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
      };
    });

    this.analyticsHandler.trackProductListViewed(products);
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
    return this.store.similarStatus === Status.ERROR;
  }

  getCars = (): Car[] => {
    const similarVehicleCount = 4;
    const similarCars = this.store.similar
      .slice(0, similarVehicleCount)
      .map((car) => car._source);
    this.trackProductList(similarCars);
    return similarCars;
  };

  handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    Router.push('/cars');
  }
}

export default SimilarVehiclesViewModel;
