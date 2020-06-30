import { CarsStore } from 'src/modules/cars/store';
import { Filters, setPage } from 'src/modules/cars/utils/url';

class PaginationViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  private getTotal = (): number => {
    return (
      this.carsStore.inventoryData?.hits.total ||
      this.carsStore.inventoryCardsPerPage
    );
  };

  getPageAndCount(): { page: number; count: number } {
    const filtersData = this.carsStore.filtersData;
    const filtersDataPage = filtersData ? filtersData[Filters.PAGE] : undefined;
    const page = filtersDataPage ? filtersDataPage : 1;
    const count = Math.ceil(
      this.getTotal() / this.carsStore.inventoryCardsPerPage
    );

    return { page, count };
  }

  onChange = (page: number): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = setPage(page, filtersData);
    const isPagination = true;
    this.carsStore.updateFiltersData(updatedFiltersData, isPagination);
  };
}

export default PaginationViewModel;
