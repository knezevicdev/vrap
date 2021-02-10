import ViewModel from './ViewModel';

describe('Additional Products View Model test', () => {
  const products = {
    vehicleServiceProtection: {
      cost: 3244,
      summary: '24 months / 24000 miles / 100 deductible',
    },
    gapCoverage: {
      cost: 645,
      summary: '24 months',
    },
    tireAndWheelCoverage: {
      cost: 653,
      summary: '36 months',
    },
  };
  const viewModel = new ViewModel(products);

  describe('has gap coverage', () => {
    it('should return true', () => {
      expect(viewModel.hasGapinDeal()).toBeTruthy();
    });
  });

  describe('has tire and wheel coverage', () => {
    it('should return true', () => {
      expect(viewModel.hasTireinDeal()).toBeTruthy();
    });
  });

  describe('has vehicle service protection', () => {
    it('should return true', () => {
      expect(viewModel.hasVehicleServiceinDeal()).toBeTruthy();
    });
  });
});
