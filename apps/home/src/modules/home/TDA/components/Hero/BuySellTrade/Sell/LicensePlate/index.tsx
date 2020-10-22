import React from 'react';

import { LicensePlateStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import { HomeStore, HomeStoreContext } from 'src/modules/home/store';

const LicensePlate: React.FC = () => {
  return (
    <HomeStoreContext.Consumer>
      {(homeStore: HomeStore): JSX.Element => {
        const licensePlateStore = new LicensePlateStore();
        const viewModel = new ViewModel(homeStore, licensePlateStore);
        return <View viewModel={viewModel} />;
      }}
    </HomeStoreContext.Consumer>
  );
};

export default LicensePlate;
