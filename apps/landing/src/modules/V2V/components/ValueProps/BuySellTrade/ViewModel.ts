import { Car } from '@vroom-web/inv-search-networking';

import AnalyticsHandler from 'src/modules/V2V/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/V2V/store/inventoryStore';

class BuySellTradeViewModel {
  private car: Car;
  private analyticsHandler: AnalyticsHandler;

  constructor(store: InventoryStore, analyticsHandler: AnalyticsHandler) {
    this.car = store.vehicle._source;
    this.analyticsHandler = analyticsHandler;
  }

  handleVideoStateChange = (event: any): void => {
    if (event.data == window.YT.PlayerState.PLAYING) {
      this.analyticsHandler.trackBuySellTradeVideoPlayed(this.car);
    }
  };
}

export default BuySellTradeViewModel;
