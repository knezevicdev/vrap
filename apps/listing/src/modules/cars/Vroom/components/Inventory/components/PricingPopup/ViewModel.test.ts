import ViewModel from './ViewModel';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('PricingPopup ViewModel Tests', () => {
  describe('getListBullets', () => {
    it('getListBullets returns an array of strings', () => {
      // Mock the service to return a deliveryFee
      const viewModel = new ViewModel();
      viewModel.deliveryFee = 799;
      expect(viewModel.getListBullets()).toStrictEqual([
        'Pre-delivery service charges of $285.50 (MA residents $385.50)',
        'Delivery fee of $799',
        'FL, NJ and NY residents only - Electronic registration filing charge of $15.00',
        'Applicable taxes, title, tag and registration charges which will be calculated at the time of purchase.',
      ]);
    });
  });

  describe('setShowPricingPopup', () => {
    it('setShowPricingPopup sets showPricingPopup', () => {
      // Mock the service to return a deliveryFee
      const viewModel = new ViewModel();
      viewModel.setShowPricingPopup(true);
      expect(viewModel.showPricingPopup).toBe(true);
    });
  });
});
