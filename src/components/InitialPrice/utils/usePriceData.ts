import { useMemo } from 'react';

import { PriceStore } from '../../../modules/price/store';
import { displayCurrency, parseDate, parsedDateTime } from '../Utils';

const usePriceData = (store: PriceStore) => {
  return useMemo(
    () => ({
      price: displayCurrency(store.price.price),
      userEmail: store.price.userEmail,
      goodUntil: parsedDateTime(store.price.goodUntil),
      goodUntilMonthDay: parseDate(store.price.goodUntil),
    }),
    [store.price.goodUntil, store.price.price, store.price.userEmail]
  );
};

export default usePriceData;
