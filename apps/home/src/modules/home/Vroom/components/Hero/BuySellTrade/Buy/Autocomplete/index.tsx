import React from 'react';

import { AutocompleteStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import { HomeStore, HomeStoreContext } from 'src/modules/home/store';

interface Props {
  className?: string;
}

const Autocomplete: React.FC<Props> = ({ className }) => {
  return (
    <HomeStoreContext.Consumer>
      {(homeStore: HomeStore): JSX.Element => {
        const autocompleteStore = new AutocompleteStore();
        const viewModel = new ViewModel(homeStore, autocompleteStore);
        return <View className={className} viewModel={viewModel} />;
      }}
    </HomeStoreContext.Consumer>
  );
};

export default Autocomplete;
