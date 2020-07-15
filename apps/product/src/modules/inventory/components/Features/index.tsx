import React from 'react';

import { InventoryStore, InventoryStoreContext } from '../../store';
import { FeaturesStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Features: React.FC = () => {
  return (
    <InventoryStoreContext.Consumer>
      {(store: InventoryStore): JSX.Element => {
        const viewModel = new ViewModel(store, new FeaturesStore());
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default Features;
