import { FiltersData } from '@vroom-web/catalog-url-integration';
import { action, observable } from 'mobx';

export class BuySellTradeBuyStore {
  @observable filtersData?: FiltersData;

  // DELTA-119
  // The "listing_filters_data" local storage key
  // is set by the listing app.
  // See that app for details on when it's added.
  // This app simply looks for that, and updates accordingly.
  @action
  initClientSide = (): void => {
    try {
      const filtersDataJson = localStorage.getItem('listing_filters_data');
      if (!filtersDataJson) {
        return;
      }
      const filtersData: FiltersData = JSON.parse(
        filtersDataJson
      ) as FiltersData;
      this.filtersData = filtersData;
    } catch {
      this.filtersData = undefined;
    }
  };
}
