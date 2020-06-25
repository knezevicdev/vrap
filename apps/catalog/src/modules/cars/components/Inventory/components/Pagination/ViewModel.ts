import { CarsStore } from 'src/modules/cars/store';
import { onPageChange } from 'src/modules/cars/utils/url';

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
    const page =
      filtersData && filtersData.page ? (filtersData.page as number) : 1;
    const count = Math.ceil(
      this.getTotal() / this.carsStore.inventoryCardsPerPage
    );

    return { page, count };
  }

  onChange = (page: number): void => {
    const filtersData = this.carsStore.filtersData;
    onPageChange(page, filtersData);
  };
}

export default PaginationViewModel;
