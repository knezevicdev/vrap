import React, { useEffect } from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

import { CatStore } from 'src/core/store';

const Congratulations = (): JSX.Element => {
  const model = new Model();
  const store = new CatStore();
  const viewModel = new ViewModel(model, store);

  useEffect(() => {
    model.getData();
    viewModel.handleMount();
    return (): void => {
      viewModel.handleUnmount();
    };
  }, [model, viewModel]);

  return <View viewModel={viewModel} />;
};

export default Congratulations;
