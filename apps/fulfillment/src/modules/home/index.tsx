import React from 'react';

import { HomeStore, HomeStoreContext } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Home: React.FC = () => {
  return (
    <HomeStoreContext.Consumer>
      {(store: HomeStore): JSX.Element => {
        const viewModel = new ViewModel(store);
        return <View viewModel={viewModel} />;
      }}
    </HomeStoreContext.Consumer>
  );
};

export default Home;
