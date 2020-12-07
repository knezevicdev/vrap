import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { CarsStoreContext } from 'src/modules/cars/store';

const CabType: React.FC = () => {
  return (
    <CarsStoreContext.Consumer>
      {(carStore): JSX.Element => {
        const viewModel = new ViewModel(carStore);
        return <View viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default CabType;
