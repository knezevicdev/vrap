import React, { useContext } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { CarsStoreContext } from 'src/modules/cars/store';

const Count: React.FC = () => {
  const carsStore = useContext(CarsStoreContext);
  const viewModel = new ViewModel(carsStore);
  return <View viewModel={viewModel} />;
};

export default Count;
