import {action, observable} from 'mobx';

export class VinStore {
    @observable vin = '';

    @action
    setVin = (vin: string): void => {
        this.vin = vin;
    };
}