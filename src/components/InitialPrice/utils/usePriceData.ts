import { useMemo } from 'react';

import usePriceStore from '../../../modules/price/store';
import { displayCurrency, parseDate, parsedDateTime } from '../Utils';

const usePriceData = () => {
  const price = usePriceStore((state) => state.price);

  return useMemo(
    () => ({
      price: displayCurrency(price.price),
      userEmail: price.userEmail,
      goodUntil: parsedDateTime(price.goodUntil),
      goodUntilMonthDay: parseDate(price.goodUntil),
    }),
    [price.goodUntil, price.price, price.userEmail]
  );
};

export default usePriceData;
