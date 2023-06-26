import { isErrorResponse } from '@vroom-web/networking';
import { StateCreator } from 'zustand';

import { getPlaidToken } from '../../../networking/request';
import { VerificationState } from './store';

export interface PaymentState {
  plaidToken: string;
  plaidTokenIsLocal: boolean;
  paymentSubmittedType: string;
  setPaymentSubmittedType(paymentSubmittedType: string): void;
  refetchPlaidToken(): Promise<void>;
}

const createPaymentSlice: StateCreator<
  VerificationState,
  [],
  [],
  PaymentState
> = (set, get) => ({
  plaidToken: '',
  plaidTokenIsLocal: false,
  paymentSubmittedType: '',
  setPaymentSubmittedType: (paymentSubmittedType: string) => {
    set({ paymentSubmittedType });
    localStorage.setItem('paymentSubmittedType', paymentSubmittedType);
  },
  refetchPlaidToken: async () => {
    const priceId = get().priceId;

    let plaidToken = '';
    const tokenResponse = await getPlaidToken(priceId);
    if (!isErrorResponse(tokenResponse)) {
      plaidToken = tokenResponse.data.getLinkToken.LinkToken;
    }

    set({
      plaidToken,
      plaidTokenIsLocal: false,
    });

    localStorage.setItem('linkToken', plaidToken);
    localStorage.setItem('priceId', priceId);
  },
});

export default createPaymentSlice;
