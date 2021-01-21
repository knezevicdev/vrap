import React, { useContext } from 'react';

import { ReviewsContext } from '../../ReviewsContext';
import View from './View';
import ViewModel from './ViewModel';

const Highlights: React.FC = () => {
  const store = useContext(ReviewsContext);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Highlights;
