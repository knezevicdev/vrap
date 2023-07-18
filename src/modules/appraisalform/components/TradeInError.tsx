import React from 'react';

import ErrorBanner from '../../../components/ErrorBanner';
import useDealStore from '../../../store/dealStore';

const TradeInError = () => {
  const tradeInError = useDealStore((state) => state.tradeInError);

  if (!tradeInError) return null;

  return <ErrorBanner errorMessage={tradeInError} />;
};

export default TradeInError;
