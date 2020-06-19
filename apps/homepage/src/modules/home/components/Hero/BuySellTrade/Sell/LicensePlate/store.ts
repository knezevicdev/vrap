import {action, observable, runInAction} from 'mobx';
import axios from 'axios';

export class LicensePlateStore {
    @observable selectedState = '';
    @observable licensePlate = '';
    @observable hasError = false;

    @action
    setSelectedState = (state: string): void => {
        this.selectedState = state;
    };

    @action
    setLicensePlate = (licensePlate: string): void => {
        this.licensePlate = licensePlate;
    };

    @action
    getVin = async (): Promise<void> => {
        const query = `
        {
            licensePlateToVin(lp:"${this.licensePlate}",state:"${this.selectedState}"){
                vehicles{
                    vin
                    stateOfRegistration
                    modelYear
                    restrictedStateIndicator
                    make
                }
            }
        }`.trim();
        try {
            axios.post(`https://gearbox-dev-int.vroomapi.com/query-public`, {
            query
        }).then(res => {
                const data = res.data.data;
                if(data){
                    console.log('error')
                    runInAction(() => {
                        this.hasError = false;
                    });
                } else {
                    runInAction(() => {
                        this.hasError = true;
                    });
                }
                console.log(res.data);
            })
        } catch {
            runInAction(() => {
                this.hasError = true;
            });
        }
    };
}
