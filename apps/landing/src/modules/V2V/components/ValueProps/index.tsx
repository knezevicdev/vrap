import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const ValueProps: React.FC<{ sectionOrderKey: string | null }> = ({
  sectionOrderKey,
}) => {
  return <View viewModel={new ViewModel(sectionOrderKey)} />;
};

export default ValueProps;
