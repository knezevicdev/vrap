import { FniProducts } from '../../types';

class ViewModel {
  products: FniProducts;
  constructor(products: FniProducts) {
    this.products = products;
  }

  hasGapinDeal = (): boolean =>
    Object.keys(this.products).includes('gapCoverage');

  hasTireinDeal = (): boolean =>
    Object.keys(this.products).includes('tireAndWheelCoverage');

  hasVehicleServiceinDeal = (): boolean =>
    Object.keys(this.products).includes('vehicleServiceProtection');
}

export default ViewModel;
