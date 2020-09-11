import { showDefaultVariant } from './experimentSDK';

describe('showDefaultVariant', () => {
  const experimentId = 'test';

  describe('query tests', () => {
    const experiments = undefined;
    test('query is setting experiment on', () => {
      const query = {
        'experiment-test': 1,
      };
      expect(showDefaultVariant(experimentId, experiments, query)).toEqual(
        false
      );
    });

    test('query is setting experiment off', () => {
      const query = {
        'experiment-test': 0,
      };
      expect(showDefaultVariant(experimentId, experiments, query)).toEqual(
        true
      );
    });

    test(`query doesn't contain experiment info`, () => {
      const query = {
        utm_param: 'chase',
      };
      expect(showDefaultVariant(experimentId, experiments, query)).toEqual(
        true
      );
    });
  });

  describe('experiment tests', () => {
    const query = {
      testing: 'testing',
    };

    describe('experiment is not there', () => {
      const experiments = [
        {
          id: 'snd-pdp-vin-cluster-similar-vehicle',
          lastUpdated: '2020-09-08T17:13:56.240208Z',
          optimizeId: 'y3GAQre_TDiVIB5MoBm3Bg',
          name: 'PDP Vin Cluster Similar Vehicle',
          status: { key: 'pending', display: 'Pending' },
          startTime: null,
          winningVariantId: null,
          variants: [
            { name: 'Default', weight: 0.5, isDefault: true, isWinner: false },
            {
              name: 'Vin Cluster',
              weight: 0.5,
              isDefault: false,
              isWinner: false,
            },
          ],
          application: null,
          assignedVariant: 0,
        },
      ];

      test('experiments is undefined', () => {
        const experiments = undefined;
        expect(showDefaultVariant(experimentId, experiments, query)).toEqual(
          true
        );
      });

      test('experiment is not in the array', () => {
        expect(showDefaultVariant(experimentId, experiments, query)).toEqual(
          true
        );
      });
    });

    describe('experiment is in the array', () => {
      const experiments = [
        {
          id: 'test',
          lastUpdated: '2020-09-08T17:13:56.240208Z',
          optimizeId: 'y3GAQre_TDiVIB5MoBm3Bg',
          name: 'PDP Vin Cluster Similar Vehicle',
          status: { key: 'pending', display: 'Pending' },
          startTime: null,
          winningVariantId: null,
          variants: [
            { name: 'Default', weight: 0.5, isDefault: true, isWinner: false },
            {
              name: 'Vin Cluster',
              weight: 0.5,
              isDefault: false,
              isWinner: false,
            },
          ],
          application: null,
        },
      ];

      test('you are in the default variant', () => {
        const defaultVariant = [...experiments];
        defaultVariant[0]['assignedVariant'] = 0;
        expect(showDefaultVariant(experimentId, defaultVariant, query)).toEqual(
          true
        );
      });

      test('you are in the experimental variant', () => {
        const experimental = [...experiments];
        experimental[0]['assignedVariant'] = 1;
        expect(showDefaultVariant(experimentId, experimental, query)).toEqual(
          false
        );
      });
    });
  });
});
