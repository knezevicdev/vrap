import { CatData, CatSDK } from '@vroom-web/cat-sdk';
import React, { useEffect, useState } from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Footer: React.FC = () => {
  const [catSDK] = useState(new CatSDK());
  const [catData, setCatData] = useState<CatData | undefined>();
  useEffect(() => {
    const catDataEventListener = (catDataEvent: CustomEvent<CatData>): void => {
      setCatData(catDataEvent.detail);
    };
    catSDK.observeCatData(catDataEventListener);
    return (): void => {
      catSDK.unobserveCatData(catDataEventListener);
    };
  }, [catSDK]);
  return <View viewModel={new ViewModel(catData)} />;
};

export default Footer;
