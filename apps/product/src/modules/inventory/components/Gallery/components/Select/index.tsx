import React from 'react';

import { GalleryStore, GalleryStoreContext } from '../../store';
import View from './View';
import ViewModel from './ViewModel';

import { Product } from 'src/integrations/analytics/AnalyticsHandler';

interface Props {
  product: Product;
}

const GallerySelect: React.FC<Props> = ({ product }) => {
  return (
    <GalleryStoreContext.Consumer>
      {(store: GalleryStore): JSX.Element => {
        const viewModel = new ViewModel(store, product);
        return <View viewModel={viewModel} />;
      }}
    </GalleryStoreContext.Consumer>
  );
};

export default GallerySelect;
