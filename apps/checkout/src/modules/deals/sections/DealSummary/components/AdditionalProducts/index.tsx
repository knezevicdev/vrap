import React from 'react';

import { FniProducts } from '../../types';
import View from './View';
import ViewModel from './ViewModel';

const AdditionalProducts = (products: FniProducts): JSX.Element => {
  const viewModel = new ViewModel(products);
  return <View viewModel={viewModel} />;
};

export default AdditionalProducts;
