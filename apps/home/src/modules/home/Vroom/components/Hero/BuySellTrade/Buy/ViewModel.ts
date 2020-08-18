import { stringify } from 'qs';

import { HomeStore } from 'src/modules/home/store';

interface Link {
  label: string;
  href: string;
}

class BuyViewModel {
  private readonly store: HomeStore;

  readonly mobileButtonLabel: string = 'Browse All Vehicles';
  readonly link: Link;

  constructor(store: HomeStore) {
    this.store = store;

    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });

    this.link = {
      href: `/cars${queryString}`,
      label: 'Browse thousands of low-mileage cars and trucks',
    };
  }

  handleButtonClick = (): void => {
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });

    window.location.href = `/cars${queryString}`;
  };
}

export default BuyViewModel;
