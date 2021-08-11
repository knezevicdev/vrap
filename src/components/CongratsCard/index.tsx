import React from 'react';
import { useMemo } from 'react';

import View from './View';
import CongratsCardViewModel from './ViewModel';

const CongratsCard = (): JSX.Element => {
  const viewModel = useMemo(() => new CongratsCardViewModel(), []);
  return <View viewModel={viewModel} />;
};

export default CongratsCard;
