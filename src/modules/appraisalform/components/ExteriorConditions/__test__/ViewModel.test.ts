import ViewModel from '../ViewModel';

import store from 'src/store';

describe('AppraisalForm Exterior condition component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('should isInExperiment called', () => {
    const isInExperimentSpy = jest.spyOn(stores.absmart, 'isInExperiment');
    viewModel.isDetailedConditionsExperiment();
    expect(isInExperimentSpy).toHaveBeenCalled();
  });
});
