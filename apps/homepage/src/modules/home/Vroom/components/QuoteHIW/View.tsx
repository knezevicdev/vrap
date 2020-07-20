import React from 'react';

import CustomerQuote from '../CustomerQuote';
import HowItWorks from '../HowItWorks';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const QuoteHIWView: React.FC<Props> = ({ viewModel }) => {
  return viewModel.quoteHIWPositionDefaultVariant ? (
    <>
      <CustomerQuote />
      <HowItWorks />
    </>
  ) : (
    <>
      <HowItWorks />
      <CustomerQuote />
    </>
  );
};

export default QuoteHIWView;
