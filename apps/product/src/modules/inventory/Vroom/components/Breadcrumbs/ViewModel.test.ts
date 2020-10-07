import { Car } from '@vroom-web/inv-search-networking';
import { ParsedUrlQuery } from 'querystring';

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

describe('Breadcrumbs ViewModel', () => {
  const car: Car = data;

  it('should return the correct breadcrumbs for a given car', () => {
    const attributionQS = '?utm_source=source&utm_campaign=campaign';
    const expected = [
      {
        key: 'all',
        name: 'All Cars',
        path: `/cars${attributionQS}`,
      },
      {
        key: 'make',
        name: 'Subaru',
        path: `/cars/subaru${attributionQS}`,
      },
      {
        key: 'model',
        name: 'Impreza',
        path: `/cars/subaru/impreza${attributionQS}`,
      },
      {
        key: 'year',
        name: '2017',
        path: `/cars/subaru/impreza/2017${attributionQS}`,
      },
      {
        key: 'yearmakemodel',
        name: `2017 Subaru Impreza`,
        path: '',
      },
    ];

    const store = new InventoryStore();
    store.vehicle._source = car;
    const query: ParsedUrlQuery = {};
    query['utm_source'] = 'source';
    query['utm_campaign'] = 'campaign';

    const viewModel = new ViewModel(query, store);
    const actual = viewModel.crumbs();
    expect(actual).toEqual(expected);
  });
});
