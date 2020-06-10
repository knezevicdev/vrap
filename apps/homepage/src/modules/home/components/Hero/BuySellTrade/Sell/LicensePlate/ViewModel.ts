import {LicensePlateStore} from "./store";

class LicensePlateViewModel {
    private readonly store: LicensePlateStore;
    constructor(store: LicensePlateStore) {
        this.store = store;
    }
}

export default LicensePlateViewModel;
