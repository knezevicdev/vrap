import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { CarsStoreContext } from 'src/modules/cars/store';

const CabinSize: React.FC = () => {
  return (
    <CarsStoreContext.Consumer>
      {(): JSX.Element => {
        const viewModel = new ViewModel();
        return <View viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default CabinSize;
