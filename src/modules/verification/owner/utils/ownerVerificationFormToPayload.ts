import { mapValues } from 'lodash';

import { UseOwnerReviewForms } from '../hooks/useOwnerReviewForms';

import { UseForm } from 'src/modules/appraisalform/components/componentInterfaces.d';
import { Verification } from 'src/networking/models/Price';

const formValues = (form: UseForm): Record<string, any> => {
  return mapValues(form.fields, 'value');
};

export const ownerVerificationFormToPayload = (
  form: UseOwnerReviewForms,
  formState = 1
): Partial<Verification> => {
  const contactValues = formValues(form.contactInfoForm);
  const pickupValues = formValues(form.pickupInfoForm);
  const loanValues = formValues(form.loanInfoForm);

  const isSameContact = pickupValues.sameContact === 'Yes';
  const isSameAddress = pickupValues.sameAddress === 'Yes';

  const bankName =
    loanValues.bank === 'Other' ? loanValues.name : loanValues.bank;

  return {
    form_state: formState,
    is_owner: contactValues.youOwner === 'Yes',
    owner_first_name: contactValues.firstName,
    owner_last_name: contactValues.lastName,
    owner_mailing_address: {
      city: contactValues.city,
      state: contactValues.state,
      zipcode: contactValues.zip,
      address_1: contactValues.address,
      address_2: contactValues.apt,
    },
    owner_phone_number: contactValues.phone,
    owner_email_address: contactValues.email,
    owners_on_title: contactValues.hasSecondOwner === 'Yes' ? 2 : 1,
    second_owner_first_name: contactValues.secondFirstName,
    second_owner_last_name: contactValues.secondLastName,
    second_owner_mailing_address: {
      city: contactValues.secondCity,
      state: contactValues.secondState,
      zipcode: contactValues.secondZip,
      address_1: contactValues.secondAddress,
      address_2: contactValues.secondApt,
    },
    second_owner_phone_number: contactValues.secondPhone,
    second_owner_email_address: contactValues.secondEmail,
    same_contact_as_owner: isSameContact,
    same_mailing_address: isSameAddress,
    pickup_address: {
      city: isSameContact ? contactValues.city : pickupValues.pickupAddressCity,
      state: isSameAddress
        ? contactValues.state
        : pickupValues.pickupAddressState,
      zipcode: isSameAddress
        ? contactValues.zip
        : pickupValues.pickupAddressZip,
      address_1: isSameAddress
        ? contactValues.address
        : pickupValues.pickupAddressAddress,
      address_2: isSameAddress
        ? contactValues.apt
        : pickupValues.pickupAddressApt,
    },
    pickup_contact_first_name: isSameContact
      ? contactValues.firstName
      : pickupValues.pickupContactFirstName,
    pickup_contact_last_name: isSameContact
      ? contactValues.lastName
      : pickupValues.pickupContactLastName,
    pickup_contact_phone_number: isSameContact
      ? contactValues.phone
      : pickupValues.pickupContactPhone,
    pickup_contact_email: isSameContact
      ? contactValues.email
      : pickupValues.pickupContactEmail,
    current_payments: loanValues.activeLoan === 'Yes',
    lien_financial_institution_name: loanValues.bank,
    lender_id: form.loanInfoForm.fields.bank.lenderId,
    lender_name: bankName,
    financial_institution_phone: loanValues.phoneNumber,
    lien_account_number: loanValues.accountNumber,
    last_four_ssn: loanValues.lastFour,
    acknowledgement_of_terms: !!loanValues.agreement,
  };
};
