import {LicensePlateStore} from "./store";
import React from "react";

class LicensePlateViewModel {
    private readonly store: LicensePlateStore;
    private readonly states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    readonly licensePlateLabel: string = 'License plate';
    readonly buttonLabel: string = 'What\'s my car worth?'


    getInputValue = (): string => {
        return this.store.licensePlate;
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        this.store.setLicensePlate(value);
    };

    constructor(store: LicensePlateStore) {
        this.store = store;
    }

    handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.store.setSelectedState(event.target.value as string);
    };

    getStates = (): string[] => {
        return this.states;
    }

    getSelectedState = (): string => {
        return this.store.selectedState;
    }

    isButtonDisabled = (): boolean => {
        return this.getSelectedState() === '' || this.getInputValue() === '';
    }

    navigate(): void {
        // const licensePlate = this.store.licensePlate;
        // const state = this.store.selectedState;
        const vin = 'JTMDWRFV9KD502170';
        window.location.href = `sell/vehicleInformation/${vin}`;
    }
}

export default LicensePlateViewModel;
