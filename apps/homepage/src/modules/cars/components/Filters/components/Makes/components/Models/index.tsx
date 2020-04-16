import React, { useContext } from 'react';

import { CarsContext } from '../../../../../../util';
import { ModelsProps } from './types';
import View from './View';
import ViewModel from './ViewModel';

const Models: React.FC<ModelsProps> = ({ make, models }) => {
  const { store } = useContext(CarsContext);
  const viewModel = new ViewModel(make, models, store);
  return <View viewModel={viewModel} models={models} />;
};

export default Models;
