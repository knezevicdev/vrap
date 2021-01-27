import React from 'react';

export const PaymentMethodContext = React.createContext({
  stateDropdownOpen: false,
  setStateDropdown: () => {},
});
