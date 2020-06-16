import {VinStore} from "../store";

class VinDialogViewModel {
  private readonly store: VinStore;

  constructor(store: VinStore) {
    this.store = store;
  }

  isOpen = (): boolean => {
    return this.store.isDialogOpen;
  };

  handleClose = () => {
    this.store.setIsDialogOpen();
  };
}

export default VinDialogViewModel;
