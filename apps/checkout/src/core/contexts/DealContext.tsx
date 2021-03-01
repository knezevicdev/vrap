import React from 'react';
import { createContext } from 'react';

import { DealStore } from 'src/core/store';

export const DealContext = createContext<DealStore>(new DealStore());

interface DealProviderProps {
  value: DealStore;
  children?: React.FC | React.ReactNode;
}

export const DealProvider: React.FC<DealProviderProps> = ({
  children,
  value,
}) => {
  return <DealContext.Provider value={value}>{children}</DealContext.Provider>;
};
