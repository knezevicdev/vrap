import { createContext, useContext } from 'react';

type PaymentInfoContextType = {
  onDone(): void;
};

const PaymentInfoContext = createContext<PaymentInfoContextType | null>(null);

export const usePaymentInfoContext = (): PaymentInfoContextType => {
  const context = useContext(PaymentInfoContext);

  if (!context) {
    throw new Error(
      'usePaymentInfoContext must be used within a PaymentInfoContextProvider'
    );
  }

  return context;
};

export default PaymentInfoContext;
