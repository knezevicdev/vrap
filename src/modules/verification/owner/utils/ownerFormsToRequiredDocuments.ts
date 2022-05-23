import calculateRequiredDocuments, {
  CalculateRequiredDocuments,
} from '../../shared/utils/calculateRequiredDocuments';
import { UseOwnerReviewForms } from '../hooks/useOwnerReviewForms';
import { ownerVerificationFormToPayload } from './ownerVerificationFormToPayload';

export const ownerFormsToRequiredDocuments = (
  forms: UseOwnerReviewForms,
  formState = 1
): CalculateRequiredDocuments => {
  return calculateRequiredDocuments(
    ownerVerificationFormToPayload(forms, formState),
    forms.loanInfoForm.fields.state.value
  );
};
