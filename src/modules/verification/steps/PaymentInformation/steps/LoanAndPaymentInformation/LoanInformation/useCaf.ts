import { useEffect, useState } from 'react';

import { Caf } from 'src/networking/models/Price';
import { getCaf } from 'src/networking/request';

const useCaf = () => {
  const [caf, setCaf] = useState<Caf[]>([]);

  useEffect(() => {
    getCaf()
      .then((res) => {
        if ('data' in res) {
          setCaf(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return caf;
};

export default useCaf;
