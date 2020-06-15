import {VinStore} from "./store";
import React from "react";

class VinViewModel {
    private readonly store: VinStore;

    constructor(store: VinStore) {
        this.store = store;
    }
    readonly buttonLabel: string = 'What\'s my car worth?'
    readonly inputPlaceholder: string = 'VIN Number';
    readonly inputLabel: string = 'Vehicle Identification Number (VIN)';

    navigate(): void {
        window.location.href = `sell/vehicleInformation/${this.store.vin}`;
    }

    getInputValue = (): string => {
        return this.store.vin;
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        this.store.setVin(value);
    };
}

export default VinViewModel;
