import React from 'react';

import { AutocompleteStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  className?: string;
}

const Autocomplete: React.FC<Props> = ({ className }) => {
  const store = new AutocompleteStore();
  const viewModel = new ViewModel(store);
  return <View className={className} viewModel={viewModel} />;
};

export default Autocomplete;
