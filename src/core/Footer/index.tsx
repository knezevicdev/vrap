import { CatData, CatSDK } from '@vroom-web/cat-sdk';
import React, { useEffect, useState } from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  hasOverlay: boolean;
}

const Footer: React.FC<Props> = ({ hasOverlay }) => {
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
  return <View viewModel={new ViewModel(catData)} hasOverlay={hasOverlay} />;
};

export default Footer;
