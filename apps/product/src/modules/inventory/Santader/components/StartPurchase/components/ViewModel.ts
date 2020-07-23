import { Store } from './store';

import globalEnv from 'src/globalEnv';

class ViewModel {
  private readonly store: Store;
  readonly image = {
    alt: 'Exit Santander',
    src: `${globalEnv.ASSET_PREFIX}/modules/inventory/components/exit-santander.png`,
  };
  readonly message: string =
    'We’re now sending you to checkout with our partner, Vroom.';
  readonly begin: string = 'You’ll be redirected in ';
  readonly end: string = ' seconds';

  constructor(store: Store) {
    this.store = store;
    setInterval(() => {
      this.store.decrementSeconds();
    }, 1000);
  }

  getSecondsLeft = (): number => {
    return this.store.secondsLeft;
  };
}

export default ViewModel;
