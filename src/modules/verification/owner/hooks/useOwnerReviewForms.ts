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
      state: '',
      zip: '',
      city: '',
      apt: {
        value: '',
        isRequired: false,
      },
      address: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      youOwner: '',
      hasSecondOwner: '',
      secondState: '',
      secondZip: '',
      secondCity: '',
      secondApt: {
        value: '',
        isRequired: false,
      },
      secondAddress: '',
      secondFirstName: '',
      secondLastName: '',
      secondPhone: '',
      secondEmail: '',
    },
  });

  const pickupInfoForm = useForm({
    defaultValues: {
      sameAddress: 'Yes',
      sameContact: 'Yes',
      pickupAddressState: {
        value: '',
        isRequired: false,
      },
      pickupAddressZip: {
        value: '',
        isRequired: false,
      },
      pickupAddressCity: {
        value: '',
        isRequired: false,
      },
      pickupAddressApt: {
        value: '',
        isRequired: false,
      },
      pickupAddressAddress: {
        value: '',
        isRequired: false,
      },
      pickupContactFirstName: {
        value: '',
        isRequired: false,
      },
      pickupContactLastName: {
        value: '',
        isRequired: false,
      },
      pickupContactPhone: {
        value: '',
        isRequired: false,
      },
      pickupContactEmail: {
        value: '',
        isRequired: false,
      },
    },
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
      agreement: false,
    },
  });

  return {
    contactInfoForm,
    pickupInfoForm,
    loanInfoForm,
  };
};

export default useOwnerReviewForms;
