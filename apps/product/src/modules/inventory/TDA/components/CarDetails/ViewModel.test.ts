import { Car } from '@vroom-web/inv-search-networking';

import data from '../../testCar.json';
import ViewModel from './ViewModel';

import { InventoryStore } from 'src/modules/inventory/store';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Car Details ViewModel', () => {
  it('should return correct history for a given car with blank warrenty', () => {
    data.warrantyRemaining = '';
    const car: Car = data;
    const expected = {
      title: 'Auto History',
      isWarrantyAvailable: false,
      manufacturersWarranty: `Manufacturer's Warranty`,
      residualText: `This vehicle still has  left on its Subaru manufacturer's warranty.`,
      cleanHistory: 'Clean Auto History',
      cleanHistoryDescription:
        'This vehicle has a clean history and is free of accidents as reported by CARFAX',
      carfax: {
        text: 'See The Report',
        href: `https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=VAU_0&UID=C520459&vin=some-vin`,
      },
      ownerTitle: 'Number of Owners: ',
      ownerCount: 1,
      vroomProtect: 'Eligible for Vroom Protect',
      vroomProtectDescription: {
        text: `This vehicle is covered by <link>Vroom Protect</link>, which provides additional mechanical coverage.`,
        href:
          'https://www.vroom.com/protection?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA',
      },
    };
    const store = new InventoryStore();
    store.vehicle._source = car;
    const viewModel = new ViewModel(store);
    const history = viewModel.history();
    expect(history).toEqual(expected);
  });
  it('should return correct history for a given car with expired warrenty', () => {
    data.warrantyRemaining = 'Coverage expired';
    const car: Car = data;
    const expected = {
      title: 'Auto History',
      isWarrantyAvailable: false,
      manufacturersWarranty: `Manufacturer's Warranty`,
      residualText: `This vehicle still has Coverage expired left on its Subaru manufacturer's warranty.`,
      cleanHistory: 'Clean Auto History',
      cleanHistoryDescription:
        'This vehicle has a clean history and is free of accidents as reported by CARFAX',
      carfax: {
        text: 'See The Report',
        href: `https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=VAU_0&UID=C520459&vin=some-vin`,
      },
      ownerTitle: 'Number of Owners: ',
      ownerCount: 1,
      vroomProtect: 'Eligible for Vroom Protect',
      vroomProtectDescription: {
        text: `This vehicle is covered by <link>Vroom Protect</link>, which provides additional mechanical coverage.`,
        href:
          'https://www.vroom.com/protection?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA',
      },
    };
    const store = new InventoryStore();
    store.vehicle._source = car;
    const viewModel = new ViewModel(store);
    const history = viewModel.history();
    expect(history).toEqual(expected);
  });
  it('should return correct history for a given car with no warrenty data', () => {
    data.warrantyRemaining = 'no data';
    const car: Car = data;
    const expected = {
      title: 'Auto History',
      isWarrantyAvailable: false,
      manufacturersWarranty: `Manufacturer's Warranty`,
      residualText: `This vehicle still has no data left on its Subaru manufacturer's warranty.`,
      cleanHistory: 'Clean Auto History',
      cleanHistoryDescription:
        'This vehicle has a clean history and is free of accidents as reported by CARFAX',
      carfax: {
        text: 'See The Report',
        href: `https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=VAU_0&UID=C520459&vin=some-vin`,
      },
      ownerTitle: 'Number of Owners: ',
      ownerCount: 1,
      vroomProtect: 'Eligible for Vroom Protect',
      vroomProtectDescription: {
        text: `This vehicle is covered by <link>Vroom Protect</link>, which provides additional mechanical coverage.`,
        href:
          'https://www.vroom.com/protection?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA',
      },
    };
    const store = new InventoryStore();
    store.vehicle._source = car;
    const viewModel = new ViewModel(store);
    const history = viewModel.history();
    expect(history).toEqual(expected);
  });
  it('should return correct history for a given car 1 month left on warrenty', () => {
    data.warrantyRemaining = '1 months';
    const car: Car = data;
    const expected = {
      title: 'Auto History',
      isWarrantyAvailable: true,
      manufacturersWarranty: `Manufacturer's Warranty`,
      residualText: `This vehicle still has 1 month left on its Subaru manufacturer's warranty.`,
      cleanHistory: 'Clean Auto History',
      cleanHistoryDescription:
        'This vehicle has a clean history and is free of accidents as reported by CARFAX',
      carfax: {
        text: 'See The Report',
        href: `https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=VAU_0&UID=C520459&vin=some-vin`,
      },
      ownerTitle: 'Number of Owners: ',
      ownerCount: 1,
      vroomProtect: 'Eligible for Vroom Protect',
      vroomProtectDescription: {
        text: `This vehicle is covered by <link>Vroom Protect</link>, which provides additional mechanical coverage.`,
        href:
          'https://www.vroom.com/protection?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA',
      },
    };
    const store = new InventoryStore();
    store.vehicle._source = car;
    const viewModel = new ViewModel(store);
    const history = viewModel.history();
    expect(history).toEqual(expected);
  });
  it('should return correct history for a given car multiple months left on warrenty', () => {
    data.warrantyRemaining = '4 months';
    const car: Car = data;
    const expected = {
      title: 'Auto History',
      isWarrantyAvailable: true,
      manufacturersWarranty: `Manufacturer's Warranty`,
      residualText: `This vehicle still has 4 months left on its Subaru manufacturer's warranty.`,
      cleanHistory: 'Clean Auto History',
      cleanHistoryDescription:
        'This vehicle has a clean history and is free of accidents as reported by CARFAX',
      carfax: {
        text: 'See The Report',
        href: `https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=VAU_0&UID=C520459&vin=some-vin`,
      },
      ownerTitle: 'Number of Owners: ',
      ownerCount: 1,
      vroomProtect: 'Eligible for Vroom Protect',
      vroomProtectDescription: {
        text: `This vehicle is covered by <link>Vroom Protect</link>, which provides additional mechanical coverage.`,
        href:
          'https://www.vroom.com/protection?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA',
      },
    };
    const store = new InventoryStore();
    store.vehicle._source = car;
    const viewModel = new ViewModel(store);
    const history = viewModel.history();
    expect(history).toEqual(expected);
  });
});
