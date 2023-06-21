import { useEffect, useState } from 'react';

import { getZipCodeState } from '../../../networking/request';
import calculateTaxSavings from './calculateTaxSavings';

const useTaxSavings = (price: number, zipcode: string) => {
  const [taxState, setTaxState] = useState('');
  const [taxSavings, setTaxSavings] = useState(0);

  useEffect(() => {
    if (!price || !zipcode) return;

    (async () => {
      const zipCodeState = await getZipCodeState(zipcode);
      if (!zipCodeState) return;

      setTaxState(zipCodeState);
      setTaxSavings(calculateTaxSavings(zipCodeState, price));
    })();
  }, [price, zipcode]);

  return {
    taxState,
    taxSavings,
  };
};

export default useTaxSavings;
