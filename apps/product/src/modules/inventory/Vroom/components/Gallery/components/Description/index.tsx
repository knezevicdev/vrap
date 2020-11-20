import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

export interface DescriptionProps {
  description: string;
  original: string;
}

const Description: React.FC<DescriptionProps> = (props: DescriptionProps) => {
  const viewModel = new ViewModel(props);
  return <View viewModel={viewModel} />;
};

export default Description;
