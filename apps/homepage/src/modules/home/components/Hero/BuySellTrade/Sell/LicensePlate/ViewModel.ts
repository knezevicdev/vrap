import {LicensePlateStore} from "./store";

class LicensePlateViewModel {
    private readonly store: LicensePlateStore;
    constructor(store: LicensePlateStore) {
        this.store = store;
    }

    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.store.setState(event.target.value as string);
    };

    getStates = () => {
        return this.store.states;
    }

    getSelectedState = () => {
        return this.store.state;
    }
}

export default LicensePlateViewModel;
