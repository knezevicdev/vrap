import React from 'react';

import { usePriceStore } from 'src/modules/price/store';
import PriceView from 'src/modules/price/View';
import PriceViewModel from 'src/modules/price/ViewModel';

const Price: React.FC = () => {
  const priceStore = usePriceStore();
  const priceViewModel = new PriceViewModel(priceStore);

  return <PriceView priceViewModel={priceViewModel} />;
};

export default Price;
