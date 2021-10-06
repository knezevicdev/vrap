import { submitPaymentOption } from '../store';

import { MailingAddress, PaymentOverviewFormValues } from 'src/interfaces.d';
import { submitPaymentOptionSelected } from 'src/networking/request';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
      serverRuntimeConfig: {},
    };
  };
});

jest.mock('src/networking/request', () => {
  const originalModule = jest.requireActual('src/networking/request');
  return {
    ...originalModule,
    submitPaymentOptionSelected: jest.fn(),
  };
});

describe('Options Store Tests', () => {
  describe('submitPaymentOption', () => {
    it('should call submitPaymentOptionSelected', async () => {
      const values = {} as PaymentOverviewFormValues;
      const priceId = '';
      const address = {} as MailingAddress;
      await submitPaymentOption(values, priceId, address);
      expect(submitPaymentOptionSelected).toHaveBeenCalledWith(
        values,
        priceId,
        address
      );
      expect(submitPaymentOptionSelected).not.toThrow();
    });
  });
});
