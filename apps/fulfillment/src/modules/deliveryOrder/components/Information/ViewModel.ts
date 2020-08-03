import { DeliveryOrderStore } from 'src/modules/deliveryOrder/store';
import { Status } from 'src/networking/Networker';

interface Info {
  general: Section;
  pickup: Section;
  delivery: Section;
  created: Item;
  modified: Item;
}
interface Section {
  label: string;
  items: Item[];
}
interface Item {
  label: string;
  value: string | number;
}

class DeliveryOrderViewModel {
  private store: DeliveryOrderStore;
  constructor(store: DeliveryOrderStore) {
    this.store = store;
  }

  getInfo(): Info {
    const dor = this.store.deliveryOrder;
    const general: Section = {
      label: 'General Information',
      items: [
        {
          label: 'Delivery Order Name',
          value: dor.id,
        },
        {
          label: 'Inventory',
          value: `${dor.vehicle.year} ${dor.vehicle.make} ${dor.vehicle.model}`,
        },
        {
          label: 'VIN',
          value: dor.vehicle.vin,
        },
        {
          label: 'Transit Type',
          value: dor.transitType,
        },
        {
          label: 'Enclosed',
          value: dor.enclosed ? 'Yes' : 'No',
        },
      ],
    };
    const pickup: Section = {
      label: 'Pickup Information',
      items: [
        {
          label: 'Account Name',
          value: dor.pickupAddress.name || '',
        },
        {
          label: 'Address',
          value: `${dor.pickupAddress.street_line_1} ${
            dor.pickupAddress.street_line_2 || ''
          }`,
        },
        {
          label: 'City',
          value: dor.pickupAddress.city,
        },
        {
          label: 'State',
          value: dor.pickupAddress.state,
        },
        {
          label: 'Postal Code',
          value: dor.pickupAddress.postal_code,
        },
      ],
    };
    const delivery: Section = {
      label: 'Delivery Information',
      items: [
        {
          label: 'Account Name',
          value: dor.deliveryAddress.name || '',
        },
        {
          label: 'Address',
          value: `${dor.deliveryAddress.street_line_1} ${
            dor.deliveryAddress.street_line_2 || ''
          }`,
        },
        {
          label: 'City',
          value: dor.deliveryAddress.city,
        },
        {
          label: 'State',
          value: dor.deliveryAddress.state,
        },
        {
          label: 'Postal Code',
          value: dor.deliveryAddress.postal_code,
        },
      ],
    };
    const result: Info = {
      general,
      pickup,
      delivery,
      created: {
        label: 'Created By',
        value: `${dor.createdBy} ${dor.created}`,
      },
      modified: {
        label: 'Last Modified By',
        value: `${dor.updatedBy} ${dor.updated}`,
      },
    };
    return result;
  }

  loading(): boolean {
    const result =
      this.store.deliveryOrderStatus === Status.FETCHING ||
      this.store.deliveryOrderStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.deliveryOrderStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.deliveryOrderStatus === Status.ERROR;
  }
}

export default DeliveryOrderViewModel;
