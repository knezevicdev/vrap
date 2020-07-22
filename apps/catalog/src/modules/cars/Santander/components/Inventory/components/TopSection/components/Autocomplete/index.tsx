import React from 'react';

import { AutocompleteStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import { CarsStore, CarsStoreContext } from 'src/modules/cars/store';

interface Props {
  className?: string;
}

const Autocomplete: React.FC<Props> = ({ className }) => {
  return (
    <CarsStoreContext.Consumer>
      {(carsStore: CarsStore): JSX.Element => {
        const autocompleteStore = new AutocompleteStore();
        const viewModel = new ViewModel(carsStore, autocompleteStore);
        return <View className={className} viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default Autocomplete;
