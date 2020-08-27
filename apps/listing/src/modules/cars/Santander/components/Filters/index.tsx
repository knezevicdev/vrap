import React, { useState } from 'react';

import FiltersStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { CarsStore, CarsStoreContext } from 'src/modules/cars/store';

const Filters: React.FC = () => {
  // Persist store instance across URL updates.
  const [filtersStore] = useState<FiltersStore>(new FiltersStore());
  return (
    <CarsStoreContext.Consumer>
      {(carsStore: CarsStore): JSX.Element => {
        const viewModel = new ViewModel(carsStore, filtersStore);
        return <View viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default Filters;
