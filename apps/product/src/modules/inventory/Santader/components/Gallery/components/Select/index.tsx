import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { Product } from 'src/integrations/AnalyticsHandler';
import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';

interface Props {
  product: Product;
}

const GallerySelect: React.FC<Props> = ({ product }) => {
  return (
    <InventoryStoreContext.Consumer>
      {(store: InventoryStore): JSX.Element => {
        const viewModel = new ViewModel(store, product);
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default GallerySelect;
