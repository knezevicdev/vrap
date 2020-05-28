import React from 'react';

import { CarsStoreContext } from '../../../../../../store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  make: string;
  models: string[];
}

const Models: React.FC<Props> = ({ make, models }) => {
  return (
    <CarsStoreContext.Consumer>
      {(carsStore): JSX.Element => {
        const viewModel = new ViewModel(make, models, carsStore);
        return <View viewModel={viewModel} models={models} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default Models;
