import React from 'react';

export interface PaymentMethodContextType {
  stateDropdownOpen: boolean;
  setStateDropdown: (value: boolean) => void;
}

export const PaymentMethodContext = React.createContext<
  Partial<PaymentMethodContextType>
>({});
