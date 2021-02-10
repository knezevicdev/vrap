import { DealStore } from '../store/DealStore';

class HeaderViewModel {
  readonly logoHref = '/';
  readonly telephone = {
    text: 'Questions?',
    href: 'tel: (855) 524-1300',
    number: `(855) 524-1300`,
  };
  private store: DealStore;

  constructor(store: DealStore) {
    this.store = store;
  }

  handleClick = (): void => {
    this.store.toggleDropdown();
  };
}

export default HeaderViewModel;
