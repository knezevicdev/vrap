import { useContext } from 'react';

import { DealContext } from 'src/core/contexts';
import { DealStore } from 'src/core/store';

export const useDeal = () => useContext<DealStore>(DealContext);
