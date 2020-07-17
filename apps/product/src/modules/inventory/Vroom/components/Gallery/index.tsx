import React from 'react';

import { GalleryStore, GalleryStoreContext } from './store';
import View from './View';
import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';

const Gallery: React.FC = () => {
  return (
    <InventoryStoreContext.Consumer>
      {(inventoryStore: InventoryStore): JSX.Element => {
        const galleryStore = new GalleryStore();
        const viewModel = new ViewModel(inventoryStore, galleryStore);
        return (
          <GalleryStoreContext.Provider value={galleryStore}>
            <View viewModel={viewModel} />
          </GalleryStoreContext.Provider>
        );
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default Gallery;
