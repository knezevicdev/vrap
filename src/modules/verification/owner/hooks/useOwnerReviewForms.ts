import { UseForm } from 'src/modules/appraisalform/components/componentInterfaces.d';
import useForm from 'src/modules/appraisalform/components/useForm';

export type UseOwnerReviewForms = {
  contactInfoForm: UseForm;
  pickupInfoForm: UseForm;
  loanInfoForm: UseForm;
};

const useOwnerReviewForms = (): UseOwnerReviewForms => {
  const contactInfoForm = useForm({
    defaultValues: {
      youOwner: '',
      firstName: '',
      lastName: '',
      address: '',
      apt: {
        value: '',
        isRequired: false,
      },
      city: '',
      state: '',
      zip: '',
      email: '',
      phone: '',
      hasSecondOwner: '',
      secondFirstName: '',
      secondLastName: '',
      secondAddress: '',
      secondApt: {
        value: '',
        isRequired: false,
      },
      secondCity: '',
      secondState: '',
      secondZip: '',
      secondEmail: '',
      secondPhone: '',
    },
    formKey: 'contactInfo',
  });

  const pickupInfoForm = useForm({
    defaultValues: {
      sameAddress: 'Yes',
      pickupAddressAddress: {
        value: '',
        isRequired: false,
      },
      pickupAddressApt: {
        value: '',
        isRequired: false,
      },
      pickupAddressCity: {
        value: '',
        isRequired: false,
      },
      pickupAddressState: {
        value: '',
        isRequired: false,
      },
      pickupAddressZip: {
        value: '',
        isRequired: false,
      },
      sameContact: 'Yes',
      pickupContactFirstName: {
        value: '',
        isRequired: false,
      },
      pickupContactLastName: {
        value: '',
        isRequired: false,
      },
      pickupContactEmail: {
        value: '',
        isRequired: false,
      },
      pickupContactPhone: {
        value: '',
        isRequired: false,
      },
    },
    formKey: 'pickupInfo',
  });

  const loanInfoForm = useForm({
    defaultValues: {
      activeLoan: 'No',
      bank: '',
      name: '',
      phoneNumber: {
        value: '',
        isRequired: false,
      },
      accountNumber: '',
      lastFour: {
        value: '',
        isRequired: false,
      },
      state: '',
      agreement: '',
    },
    formKey: 'loanInfo',
  });

  return {
    contactInfoForm,
    pickupInfoForm,
    loanInfoForm,
  };
};

export default useOwnerReviewForms;
