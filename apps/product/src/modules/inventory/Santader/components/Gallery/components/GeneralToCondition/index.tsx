import React from 'react';

import { GalleryStore, GalleryStoreContext } from '../../store';
import View from './View';
import ViewModel from './ViewModel';

const GalleryGeneralToCondition: React.FC = () => {
  return (
    <GalleryStoreContext.Consumer>
      {(store: GalleryStore): JSX.Element => {
        const viewModel = new ViewModel(store);
        return <View viewModel={viewModel} />;
      }}
    </GalleryStoreContext.Consumer>
  );
};

export default GalleryGeneralToCondition;
