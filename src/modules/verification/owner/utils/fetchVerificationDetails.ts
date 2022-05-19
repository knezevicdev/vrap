import { isErrorResponse } from '@vroom-web/networking';
import { isEmpty, mapValues } from 'lodash';

import { UseOwnerReviewForms } from '../hooks/useOwnerReviewForms';

import { UseForm } from 'src/modules/appraisalform/components/componentInterfaces.d';
import { Verification } from 'src/networking/models/Price';
import { getVerificationDetails } from 'src/networking/request';

const updateFormValues = (form: UseForm, values: Record<string, any>): void => {
  form.updateMultipleFields(
    mapValues(form.fields, (field, key) => {
      const value = values[key];

      return {
        ...field,
        value: value ? value : field.value,
      };
    })
  );
};

const fetchVerificationDetails = async (
  priceId: string,
  forms: UseOwnerReviewForms
): Promise<number> => {
  let verificationDetails: Verification | undefined;

  try {
    const response = await getVerificationDetails(priceId);
    if (!isErrorResponse(response)) {
      verificationDetails = response.data.data;
    }
  } catch (e) {
    // nothing
  }
  if (!verificationDetails) return 0;

  updateFormValues(forms.contactInfoForm, {
    state: verificationDetails.owner_mailing_address.state,
    zip: verificationDetails.owner_mailing_address.zipcode,
    city: verificationDetails.owner_mailing_address.city,
    apt: verificationDetails.owner_mailing_address.address_2,
    address: verificationDetails.owner_mailing_address.address_1,
    firstName: verificationDetails.owner_first_name,
    lastName: verificationDetails.owner_last_name,
    phone: verificationDetails.owner_phone_number,
    email: verificationDetails.owner_email_address,
    youOwner: verificationDetails.is_owner ? 'Yes' : 'No',
    hasSecondOwner: verificationDetails.owners_on_title > 1 ? 'Yes' : 'No',
    secondState: verificationDetails.second_owner_mailing_address.state,
    secondZip: verificationDetails.second_owner_mailing_address.zipcode,
    secondCity: verificationDetails.second_owner_mailing_address.city,
    secondApt: verificationDetails.second_owner_mailing_address.address_2,
    secondAddress: verificationDetails.second_owner_mailing_address.address_1,
    secondFirstName: verificationDetails.second_owner_first_name,
    secondLastName: verificationDetails.second_owner_last_name,
    secondPhone: verificationDetails.second_owner_phone_number,
    secondEmail: verificationDetails.second_owner_email_address,
  });

  updateFormValues(forms.pickupInfoForm, {
    sameAddress: isEmpty(verificationDetails.pickup_address.state)
      ? 'Yes'
      : 'No',
    sameContact: isEmpty(verificationDetails.pickup_contact_first_name)
      ? 'Yes'
      : 'No',
    pickupAddressState: verificationDetails.pickup_address.state,
    pickupAddressZip: verificationDetails.pickup_address.zipcode,
    pickupAddressCity: verificationDetails.pickup_address.city,
    pickupAddressApt: verificationDetails.pickup_address.address_2,
    pickupAddressAddress: verificationDetails.pickup_address.address_1,
    pickupContactFirstName: verificationDetails.pickup_contact_first_name,
    pickupContactLastName: verificationDetails.pickup_contact_last_name,
    pickupContactPhone: verificationDetails.pickup_contact_phone_number,
    pickupContactEmail: verificationDetails.pickup_contact_email,
  });

  updateFormValues(forms.loanInfoForm, {
    activeLoan: isEmpty(verificationDetails.lien_financial_institution_name)
      ? 'No'
      : 'Yes',
    bank: verificationDetails.lien_financial_institution_name,
    name: verificationDetails.lien_financial_institution_name,
    phoneNumber: verificationDetails.financial_institution_phone,
    accountNumber: verificationDetails.lien_account_number,
    lastFour: verificationDetails.last_four_ssn,
    agreement: verificationDetails.acknowledgement_of_terms,
  });

  return verificationDetails.form_state - 1;
};

export default fetchVerificationDetails;
