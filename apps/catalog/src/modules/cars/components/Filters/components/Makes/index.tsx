import React, { useState } from 'react';

import { CarsStoreContext } from '../../../../store';
import MakesStore from './store';
import View from './View';
import ViewModel from './ViewModel';

const Makes: React.FC = () => {
  /* FIT-307. Putting the makesStore into local state ensures
  that there is only one instance of the makesStore
  until the component is unmounted.
  This is an edge case.
  Usually, your components will only rerender when absolutely necessary,
  so there will be only one store instance anyway.
  In this case, filters cause a navigation which rerenders this component.
  Doing this allows the store instance to be persisted across pages. */
  const [makesStore] = useState(new MakesStore());
  return (
    <CarsStoreContext.Consumer>
      {(carsStore): JSX.Element => {
        const viewModel = new ViewModel(carsStore, makesStore);
        return <View viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default Makes;
