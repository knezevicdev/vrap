import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  src: string;
  className?: string;
}

const Picture: React.FC<Props> = ({ children, src, className }) => {
  const viewModel = new ViewModel(src, className);
  return <View viewModel={viewModel}>{children}</View>;
};

export default Picture;
