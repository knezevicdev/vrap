import Model from '../Model';
import ViewModel from '../ViewModel';

describe('Shipments ViewModel', () => {
  describe('tabs (not tableData)', () => {
    test('has counts', () => {
      const model = new Model('finn@adventure.time');
      model.counts = [{ status: 'Posted', count: 1 }];
      const viewModel = new ViewModel(model);
      expect(viewModel.tabs[0].display).toBe('Posted');
      expect(viewModel.tabs[1].display).toBe('Booked');
      expect(viewModel.tabs[2].display).toBe('In Transit');
      expect(viewModel.tabs[3].display).toBe('Cancelled');
      expect(viewModel.tabs[4].display).toBe('Delivered');
    });
  });
});
