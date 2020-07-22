import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { CarsStoreContext } from 'src/modules/cars/store';

const Pagination: React.FC = () => {
  return (
    <CarsStoreContext.Consumer>
      {(carsStore): JSX.Element => {
        const viewModel = new ViewModel(carsStore);
        return <View viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default Pagination;
