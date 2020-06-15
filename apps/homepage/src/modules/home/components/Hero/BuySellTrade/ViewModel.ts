import { BuySellTradeStore } from './store';

class BuySellTradeViewModel {
  private readonly store: BuySellTradeStore;
  readonly buyTab: string = 'BUY';
  readonly sellTab: string = 'SELL/TRADE';

  constructor(store: BuySellTradeStore) {
    this.store = store;
  }

  handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    this.store.setTab(newValue);
  };

  getTab = (): number => {
    return this.store.tab;
  };

  showBuy = (): boolean => {
    return this.store.tab == 0;
  };
}

export default BuySellTradeViewModel;
