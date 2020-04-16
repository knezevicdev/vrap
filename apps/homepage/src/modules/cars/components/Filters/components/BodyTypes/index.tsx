import React, { useContext } from 'react';

import { CarsContext } from '../../../../util';
import View from './View';
import ViewModel from './ViewModel';

const BodyTypes: React.FC = () => {
  const { store } = useContext(CarsContext);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default BodyTypes;
