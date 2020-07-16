import {InventoryStore} from "../../../../store";
import {Car} from "@vroom-web/inv-search-networking";

class ViewModel {
    private car: Car;
    constructor(store: InventoryStore) {
        this.car = store.vehicle._source;
    }

    getInformation = () => {
        return {
            title: 'Basics',
            items: [
                {
                    label: 'Body Type',
                    value: this.car.bodyType,
                },
                {
                    label: 'Interior',
                    value: this.car.intColor,
                },
                {
                    label: 'Exterior',
                    value: this.car.extColor,
                },
                {
                    label: 'VIN',
                    value: this.car.vin,
                },
            ],
        }
    }
}

export default ViewModel;
