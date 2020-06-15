import { SellStore } from './store';

class SellViewModel {
  private readonly store: SellStore;
  readonly buyTab: string = 'LICENSE PLATE';
  readonly sellTab: string = 'VIN';

  constructor(store: SellStore) {
    this.store = store;
  }

  handleChange = (_: React.ChangeEvent<{}>, newValue: number): void => {
    this.store.setTab(newValue);
  };

  getTab = (): number => {
    return this.store.tab;
  };

  showLicensePlate = (): boolean => {
    return this.store.tab == 0;
  };
}

export default SellViewModel;
