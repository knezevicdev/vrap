import React from 'react';

import { AutocompleteStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Autocomplete: React.FC = () => {
  const store = new AutocompleteStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Autocomplete;
