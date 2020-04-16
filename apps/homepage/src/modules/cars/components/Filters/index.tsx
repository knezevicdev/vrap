import React, { useContext } from 'react';

import { CarsContext } from '../../util';
import { FiltersProps } from './types';
import View from './View';
import FiltersViewModel from './ViewModel';

const Filters: React.FC<FiltersProps> = props => {
  const { store } = useContext(CarsContext);
  const viewModel = new FiltersViewModel(store);
  return <View {...props} viewModel={viewModel} />;
};

export default Filters;
