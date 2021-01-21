import { AsyncStore } from 'src/interfaces.d';

class AsyncIndicatorViewModel {
  constructor(private store: AsyncStore) {}

  get isRequesting(): boolean {
    return this.store.isRequesting;
  }
}

export default AsyncIndicatorViewModel;
