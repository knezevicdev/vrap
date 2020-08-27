import React from 'react';

import View from './View';
import ViewModel, { Model } from './ViewModel';

import { CarsStoreContext } from 'src/modules/cars/store';

interface Props {
  makeSlug: string;
  models: Model[];
}

const Models: React.FC<Props> = ({ makeSlug, models }) => {
  return (
    <CarsStoreContext.Consumer>
      {(carsStore): JSX.Element => {
        const viewModel = new ViewModel(makeSlug, models, carsStore);
        return <View viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default Models;
