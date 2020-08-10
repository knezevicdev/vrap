import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { CarsStore, CarsStoreContext } from 'src/modules/cars/store';

const TopSection: React.FC = () => {
  return (
    <CarsStoreContext.Consumer>
      {(carsStore: CarsStore): JSX.Element => {
        const viewModel = new ViewModel(carsStore);
        return <View viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default TopSection;
