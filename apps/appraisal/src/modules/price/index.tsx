import React, { useContext } from 'react';
import PriceView from 'src/modules/price/View';
import PriceViewModel from 'src/modules/price/ViewModel';

const Price: React.FC = () => {
  const store = new PriceStore();
  const priceViewModel = new PriceViewModel(store);

  return (
    <PriceView viewModel={priceViewModel} />
  );
};

export default Price;
