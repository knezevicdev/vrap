import React from 'react';

import { CarsStoreContext } from '../../../../../../store';
import View from './View';
import ViewModel, { Model } from './ViewModel';

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
