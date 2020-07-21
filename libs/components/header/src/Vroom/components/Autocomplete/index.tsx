import React from 'react';

import { AutocompleteStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  classes?: object;
  invSearchV3Url: string;
}

const Autocomplete: React.FC<Props> = ({ classes, invSearchV3Url }) => {
  const autocompleteStore = new AutocompleteStore(invSearchV3Url);
  const viewModel = new ViewModel({
    autocompleteStore,
    classes,
  });
  return <View viewModel={viewModel} />;
};

export default Autocomplete;
