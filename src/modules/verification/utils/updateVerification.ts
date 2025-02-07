import { isErrorResponse } from '@vroom-web/networking';

import useVerificationStore from '../store/store';

import { PatchReview } from 'src/networking/models/Verification';
import { patchVerification } from 'src/networking/request';

const yesNoOrUndefined = (value: string) => {
  if (!value) return undefined;
  return value === 'Yes';
};

const optionalFieldValue =
  (
    verificationState: ReturnType<typeof useVerificationStore.getState>,
    validator: boolean
  ) =>
  <T extends keyof ReturnType<typeof useVerificationStore.getState>, K>(
    key: T,
    fallback: K
  ): ReturnType<typeof useVerificationStore.getState>[T] | K => {
    if (!validator) return fallback;
    return verificationState[key];
  };

const updateVerification = async (formState: number) => {
  const verificationState = useVerificationStore.getState();

  const hasSecondOwner = verificationState.secondOwnerConfirmation === 'Yes';
  const ownersOnTitle = hasSecondOwner ? 2 : 1;

  const secondOwnerFieldValue = optionalFieldValue(
    verificationState,
    hasSecondOwner
  );
  const loanFieldValue = optionalFieldValue(
    verificationState,
    verificationState.loanConfirmation === 'Yes'
  );

  if (verificationState.loanLastFourDigits) {
    localStorage.setItem('lastFourSSN', verificationState.loanLastFourDigits);
  }

  const payload: PatchReview = {
    form_state: Math.max(formState, verificationState.formState),
    offer_id: verificationState.priceId,
    is_owner: yesNoOrUndefined(verificationState.firstOwnerConfirmation),
    owner_first_name: verificationState.firstOwnerFirstName,
    owner_middle_name: verificationState.firstOwnerMiddleName,
    owner_last_name: verificationState.firstOwnerLastName,
    owner_mailing_address: {
      address_1: verificationState.firstOwnerAddress,
      address_2: verificationState.firstOwnerApt,
      city: verificationState.firstOwnerCity,
      state: verificationState.firstOwnerState,
      zipcode: verificationState.firstOwnerZip,
    },
    owner_phone_number: verificationState.firstOwnerPhoneNumber,
    owner_email_address: verificationState.firstOwnerEmail,
    owners_on_title: ownersOnTitle,
    second_owner_first_name: secondOwnerFieldValue('secondOwnerFirstName', ''),
    second_owner_middle_name: secondOwnerFieldValue(
      'secondOwnerMiddleName',
      ''
    ),
    second_owner_last_name: secondOwnerFieldValue('secondOwnerLastName', ''),
    second_owner_mailing_address: hasSecondOwner
      ? {
          address_1: verificationState.secondOwnerAddress,
          address_2: verificationState.secondOwnerApt,
          city: verificationState.secondOwnerCity,
          state: verificationState.secondOwnerState,
          zipcode: verificationState.secondOwnerZip,
        }
      : {},
    second_owner_phone_number: secondOwnerFieldValue(
      'secondOwnerPhoneNumber',
      ''
    ),
    second_owner_email_address: secondOwnerFieldValue('secondOwnerEmail', ''),
    same_mailing_address: yesNoOrUndefined(
      verificationState.pickupAddressConfirmation
    ),
    pickup_address: {
      address_1: verificationState.pickupAddress,
      address_2: verificationState.pickupApt,
      city: verificationState.pickupCity,
      state: verificationState.pickupState,
      zipcode: verificationState.pickupZip,
    },
    same_contact_as_owner: yesNoOrUndefined(
      verificationState.pickupContactConfirmation
    ),
    pickup_contact_first_name: verificationState.pickupContactFirstName,
    pickup_contact_last_name: verificationState.pickupContactLastName,
    pickup_contact_phone_number: verificationState.pickupContactPhoneNumber,
    pickup_contact_email: verificationState.pickupContactEmail,
    current_payments: yesNoOrUndefined(verificationState.loanConfirmation),
    lien_financial_institution_name: loanFieldValue(
      'loanInstitution',
      undefined
    ),
    financial_institution_phone: loanFieldValue('loanPhoneNumber', undefined),
    lien_account_number: loanFieldValue('loanAccountNumber', undefined),
    last_four_ssn: loanFieldValue('loanLastFourDigits', null),
    lender_id: loanFieldValue('loanInstitutionId', ''),
    lender_name: loanFieldValue('loanName', ''),
    acknowledgement_of_terms: loanFieldValue('loanAcknowledgement', undefined),
    loan_state: loanFieldValue('loanState', ''),
    exact_mileage: Number(
      String(verificationState.documentMileageValue).replace(/\D/g, '')
    ),
    mileage_file_id: verificationState.documentOdometer,
    front_of_title_lien_file_id: verificationState.documentTitleFront,
    back_of_title_lien_file_id: verificationState.documentTitleBack,
    front_of_driver_license_file_id:
      verificationState.documentDriverLicenseFront,
    second_owner_front_of_driver_license_file_id:
      verificationState.documentSecondDriverLicenseFront,
    current_registration_file_id: verificationState.documentVehicleRegistration,
    lien_release_letter_file_id: verificationState.documentReleaseLetter,
    back_of_driver_license_file_id: verificationState.documentDriverLicenseBack,
    second_owner_back_of_driver_license_file_id:
      verificationState.documentSecondDriverLicenseBack,
    payment_submitted: Boolean(verificationState.paymentSubmittedType),
  };

  const response = await patchVerification({
    source: 'vroom.com',
    version: '1',
    timestamp: new Date().toISOString(),
    payload,
  });
  if (isErrorResponse(response)) return false;

  return response;
};

export default updateVerification;
