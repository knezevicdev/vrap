import React from 'react';

import { AutocompleteStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import { HomeStore, HomeStoreContext } from 'src/modules/home/store';

interface Props {
  buttonVariant?: 'outlined' | 'contained';
  className?: string;
}

const Autocomplete: React.FC<Props> = ({ buttonVariant, className }) => {
  return (
    <HomeStoreContext.Consumer>
      {(homeStore: HomeStore): JSX.Element => {
        const autocompleteStore = new AutocompleteStore();
        const viewModel = new ViewModel(homeStore, autocompleteStore);
        return (
          <View
            buttonVariant={buttonVariant}
            className={className}
            viewModel={viewModel}
          />
        );
      }}
    </HomeStoreContext.Consumer>
  );
};

export default Autocomplete;
