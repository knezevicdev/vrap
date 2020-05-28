import React, { useState } from 'react';

import { CarsStore, CarsStoreContext } from '../../store';
import FiltersStore from './store';
import View from './View';
import ViewModel from './ViewModel';

const Filters: React.FC = () => {
  /* FIT-307. Putting the filtersStore into local state ensures
  that there is only one instance of the filtersStore
  until the component is unmounted.
  This is an edge case.
  Usually, your components will only rerender when absolutely necessary,
  so there will be only one store instance anyway.
  In this case, filters cause a navigation which rerenders this component.
  Doing this allows the store instance to be persisted across pages. */
  const [filtersStore] = useState(new FiltersStore());
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
