import React from 'react';
import useForm from '@app/components/Form/useForm';
import FirstNameInput from '@app/components/Form/Inputs/FirstNameInput';
import LastNameInput from '@app/components/Form/Inputs/LastNameInput';
import EmailInput from '@app/components/Form/Inputs/EmailInput';
import MultiStepForm from './';
import PropTypes from 'prop-types';

export const FirstInfoForm = ({ fields }) => (
  <>
    <FirstNameInput field={fields.first} />
    <LastNameInput field={fields.last} />
    <EmailInput field={fields.email} />
  </>
);

export const SecondInfoForm = ({ fields }) => (
  <>
    <FirstNameInput field={fields.first} />
    <LastNameInput field={fields.last} />
    <EmailInput field={fields.email} />
  </>
);

export const ThirdInfoForm = ({ fields }) => (
  <>
    <FirstNameInput field={fields.first} />
    <LastNameInput field={fields.last} />
    <EmailInput field={fields.email} />
  </>
);

FirstInfoForm.propTypes = {
  fields: PropTypes.object
};

SecondInfoForm.propTypes = {
  fields: PropTypes.object
};

ThirdInfoForm.propTypes = {
  fields: PropTypes.object
};

const FormMain = () => {
  const sendToRedux = () => {
    // console.log('reduxed');
  };

  const defaultFieldValues = {
    defaultValues: {
      first: '',
      last: '',
      email: ''
    },
    customEvents: {
      onBlur: sendToRedux
    }
  };

  const firstForm = useForm(defaultFieldValues);
  const secondForm = useForm(defaultFieldValues);
  const thirdForm = useForm(defaultFieldValues);

  const sections = [
    {
      component: FirstInfoForm,
      form: firstForm,
      subTitle: 'Form 1',
      title: 'Section 1'
    },
    {
      component: SecondInfoForm,
      form: secondForm,
      subTitle: 'Form 2',
      title: 'Section 2'
    },
    {
      component: ThirdInfoForm,
      form: thirdForm,
      subTitle: 'Form 3',
      title: 'Section 3'
    }
  ];

  const onSubmit = () => {
    // get field values for each "form"
    //     const firstFormFields = firstForm.fields;
    //     const secondFormFields = secondForm.fields;
    //     const thirdFormFields = thirdForm.fields;

    alert("Here is where we'd submit to api and add to redux if necessary");
  };

  return (
    <MultiStepForm
      formTitle="Multi-step form example"
      sections={sections}
      onDone={onSubmit}
      active={0}
    />
  );
};

export default FormMain;
