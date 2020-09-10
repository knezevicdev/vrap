import { showDefaultVariant } from './experimentSDK';

describe('showDefaultVariant', () => {
  const experimentId = 'test';
  test('query is setting experiment on', () => {
    const query = {
      'experiment-test': 1,
    };
    const experiments = undefined;
    expect(showDefaultVariant(experimentId, experiments, query)).toEqual(false);
  });

  test('query is setting experiment off', () => {
    const query = {
      'experiment-test': 0,
    };
    const experiments = undefined;
    expect(showDefaultVariant(experimentId, experiments, query)).toEqual(true);
  });
});
