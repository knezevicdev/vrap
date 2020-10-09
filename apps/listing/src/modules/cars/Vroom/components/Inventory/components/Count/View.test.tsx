import 'mobx-react/batchingForReactDom';

import { render } from '@testing-library/react';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Count View', () => {
  const carStore = new CarsStore();
  const viewModel = new ViewModel(carStore);
  viewModel.getCount = jest.fn();
  viewModel.getCountText = jest.fn();
  render(<View viewModel={viewModel} />);
  it('should call the getCount and getMessage fn', () => {
    expect(viewModel.getCount).toHaveBeenCalledTimes(1);
    expect(viewModel.getCountText).toHaveBeenCalledTimes(1);
  });
});
