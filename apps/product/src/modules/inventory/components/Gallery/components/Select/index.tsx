import React from 'react';

import { GalleryStore, GalleryStoreContext } from '../../store';
import View from './View';
import ViewModel from './ViewModel';

const GallerySelect: React.FC = () => {
  return (
    <GalleryStoreContext.Consumer>
      {(store: GalleryStore): JSX.Element => {
        const viewModel = new ViewModel(store);
        return <View viewModel={viewModel} />;
      }}
    </GalleryStoreContext.Consumer>
  );
};

export default GallerySelect;
