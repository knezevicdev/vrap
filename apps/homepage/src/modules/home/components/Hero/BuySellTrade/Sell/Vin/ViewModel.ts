import {VinStore} from "./store";

class VinViewModel {
    private readonly store: VinStore;
    constructor(store: VinStore) {
        this.store = store;
        console.log(this.store);
    }
}

export default VinViewModel;
