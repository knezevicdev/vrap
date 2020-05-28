import React from 'react';

import { CarsStoreContext } from '../../../../store';
import View from './View';
import ViewModel from './ViewModel';

const Price: React.FC = () => {
  return (
    <CarsStoreContext.Consumer>
      {(carsStore): JSX.Element => {
        const viewModel = new ViewModel(carsStore);
        return <View viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default Price;
