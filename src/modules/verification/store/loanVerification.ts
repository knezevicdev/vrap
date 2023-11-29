import { StateCreator } from 'zustand';

import useLoanInformationForm from '../steps/PaymentInformation/steps/LoanAndPaymentInformation/LoanInformation/useLoanInformationForm';
import useLoanConfirmationForm from '../steps/PaymentInformation/steps/LoanConfirmation/useLoanConfirmationForm';
import { VerificationState } from './store';

export interface LoanVerificationState {
  loanConfirmation: string;
  loanInstitution: string;
  loanPhoneNumber: string;
  loanAccountNumber: string;
  loanLastFourDigits: string;
  loanState: string;
  loanName: string;
  loanInstitutionId: string;
  loanAcknowledgement: boolean;
  loadLoanStateFromForms: (
    loanConfirmationForm: ReturnType<typeof useLoanConfirmationForm>,
    loanInfoForm: ReturnType<typeof useLoanInformationForm>
  ) => void;
}

const createLoanVerificationSlice: StateCreator<
  VerificationState,
  [],
  [],
  LoanVerificationState
> = (set) => ({
  loanConfirmation: '',
  loanInstitution: '',
  loanPhoneNumber: '',
  loanAccountNumber: '',
  loanLastFourDigits: '',
  loanState: '',
  loanName: '',
  loanInstitutionId: '',
  loanAcknowledgement: false,
  loadLoanStateFromForms: (loanConfirmationForm, loanInfoForm) => {
    const { loanConfirmation } = loanConfirmationForm.getValues();
    const {
      bankName: loanInstitution,
      manualBankName,
      phoneNumber,
      accountNumber,
      lastFourDigits,
      state: loanState,
      acknowledgment: hasAcknowledgment,
      lienId,
    } = loanInfoForm.getValues();

    const bankName =
      loanInstitution === 'Other' ? manualBankName : loanInstitution;
    const loanInstitutionId = loanInstitution === 'Other' ? '' : lienId;

    localStorage.setItem('lastFour', lastFourDigits || '');
    localStorage.setItem('whereIsVehicleRegistered', loanState);

    set((state) => ({
      ...state,
      loanConfirmation,
      loanInstitution,
      loanPhoneNumber: phoneNumber,
      loanAccountNumber: accountNumber,
      loanLastFourDigits: lastFourDigits,
      loanState: loanState,
      loanName: bankName,
      loanInstitutionId,
      loanAcknowledgement: hasAcknowledgment,
    }));
  },
});

export default createLoanVerificationSlice;
