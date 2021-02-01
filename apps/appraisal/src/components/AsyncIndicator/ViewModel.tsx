import { AsyncStatus, Store } from 'src/interfaces.d';

class AsyncIndicatorViewModel {
  constructor(private store: Store) {}

  get isFetching(): boolean {
    return this.store.asyncStatus === AsyncStatus.Fetching;
  }
}

export default AsyncIndicatorViewModel;
