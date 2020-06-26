import React, { useState } from 'react';

import { CarsStoreContext } from '../../../../store';
import MakesStore from './store';
import View from './View';
import ViewModel from './ViewModel';

const Makes: React.FC = () => {
  // Persist store instance across url changes.
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
