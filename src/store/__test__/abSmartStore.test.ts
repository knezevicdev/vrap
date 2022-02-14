import { ABSmartlyModel } from '@vroom-web/absmartly-integration';
import { Status } from '@vroom-web/networking';

import { ABSmartStore } from '../abSmartStore';

describe('test absmartly store', () => {
  let store: ABSmartStore;

  const absmartModel = new ABSmartlyModel({
    application: 'vroom',
    endpoint: 'vroom_endpoint',
    apiKey: 'vroom_api_key',
    environment: 'env',
  });

  beforeEach(() => {
    store = new ABSmartStore();
  });

  test('initial set store, should change abSmartlyModel ', () => {
    store.setABSmartlyModel(absmartModel);
    expect(store.abSmartlyModel).toEqual(absmartModel);
  });

  test('shoud loading return true', () => {
    expect(store.isABSmartlyLoading).toEqual(true);
  });

  test('shoud loading return false', () => {
    absmartModel.setStatus(Status.SUCCESS);
    store.setABSmartlyModel(absmartModel);
    expect(store.isABSmartlyLoading).toEqual(false);
  });

  test('should isInExperiment return false', () => {
    expect(store.isInExperiment('test')).toEqual(false);
  });

  test('should isInExperiment return true', () => {
    absmartModel.getOverrides();
    store.setABSmartlyModel(absmartModel);
    expect(store.isInExperiment('test')).toEqual(false);
  });
});
