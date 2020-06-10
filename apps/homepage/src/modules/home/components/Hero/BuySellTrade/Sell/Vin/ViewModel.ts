import {VinStore} from "./store";

class VinViewModel {
    private readonly store: VinStore;
    constructor(store: VinStore) {
        this.store = store;
    }
}

export default VinViewModel;
