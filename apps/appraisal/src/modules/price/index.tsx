import React from 'react';
import PriceView from 'src/modules/price/View';
import PriceViewModel from 'src/modules/price/ViewModel';
import { usePriceStore } from 'src/modules/price/store';

const Price: React.FC = () => {
  const priceStore = usePriceStore();
  const priceViewModel = new PriceViewModel(priceStore);

  return (
    <PriceView priceViewModel={priceViewModel} />
  );
};

export default Price;
