import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from 'src/modules/inventory/store';

interface History {
  title: string;
  isWarrantyAvailable: boolean;
  manufacturersWarranty: string;
  residualText: string;
  cleanHistory: string;
  cleanHistoryDescription: string;
  carfax: Link;
  ownerCount: number;
  ownerTitle: string;
  vroomProtect: string;
  vroomProtectDescription: Link;
}

interface Link {
  text: string;
  href: string;
}

class CarDetailsViewModel {
  private car: Car;
  readonly title: string = 'Car Details';

  constructor(inventoryStore: InventoryStore) {
    this.car = inventoryStore.vehicle._source;
  }

  history(): History {
    const { make, ownerCount, warrantyRemaining, vin } = this.car;

    let residual = warrantyRemaining;
    const [numberOfMonths, wordMonths, ...rest] = warrantyRemaining.split(' ');
    if (wordMonths === 'months' && parseInt(numberOfMonths, 10) <= 1) {
      residual = [numberOfMonths, 'month', ...rest].join(' ');
    }

    const isWarrantyAvailable =
      warrantyRemaining !== '' &&
      warrantyRemaining !== 'no data' &&
      warrantyRemaining !== 'Coverage expired';

    return {
      title: 'Auto History',
      isWarrantyAvailable,
      manufacturersWarranty: `Manufacturer's Warranty`,
      residualText: `This vehicle still has ${residual} left on its ${make} manufacturer's warranty.`,
      cleanHistory: 'Clean Auto History',
      cleanHistoryDescription:
        'This vehicle has a clean history and is free of accidents as reported by CARFAX',
      carfax: {
        text: 'See The Report',
        href: `https://www.carfax.com/VehicleHistory/p/Report.cfx?partner=VAU_0&UID=C520459&vin=${vin}`,
      },
      ownerTitle: 'Number of Owners: ',
      ownerCount: ownerCount,
      vroomProtect: 'Eligible for Vroom Protect',
      vroomProtectDescription: {
        text: `This vehicle is covered by <link>Vroom Protect</link>, which provides additional mechanical coverage.`,
        href: 'https://www.vroom.com/protection',
      },
    };
  }
}

export default CarDetailsViewModel;
