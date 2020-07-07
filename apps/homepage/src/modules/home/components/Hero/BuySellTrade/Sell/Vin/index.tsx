import React from 'react';

import { VinStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import { HomeStore, HomeStoreContext } from 'src/modules/home/store';

const Vin: React.FC = () => {
  return (
    <HomeStoreContext.Consumer>
      {(homeStore: HomeStore): JSX.Element => {
        const vinStore = new VinStore();
        const viewModel = new ViewModel(homeStore, vinStore);
        return <View viewModel={viewModel} />;
      }}
    </HomeStoreContext.Consumer>
  );
};

export default Vin;
