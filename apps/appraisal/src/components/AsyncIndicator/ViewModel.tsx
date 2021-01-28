import { AsyncStatus, AsyncStore } from 'src/interfaces.d';

class AsyncIndicatorViewModel {
  constructor(private store: AsyncStore) {}

  get isFetching(): boolean {
    return this.store.asyncStatus === AsyncStatus.Fetching;
  }
}

export default AsyncIndicatorViewModel;
