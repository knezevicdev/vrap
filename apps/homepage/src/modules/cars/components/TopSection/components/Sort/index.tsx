import React, { useContext } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { CarsContext } from 'src/modules/cars/util';

const Sort: React.FC = () => {
  const { store } = useContext(CarsContext);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Sort;
