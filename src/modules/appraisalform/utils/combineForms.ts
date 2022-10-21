import { FormField, UseForm } from '../components/componentInterfaces.d';

const applyFunctionToFormWithFields = (
  fieldsToUpdate: Record<string, FormField>,
  forms: UseForm[],
  updateFunction: 'updateMultipleFields' | 'setFormFields'
) => {
  forms.forEach((form) => {
    if (Object.keys(fieldsToUpdate).every((key) => key in form.fields)) {
      form[updateFunction](fieldsToUpdate);
    }
  });
};

const combineForms = (
  isFormValid: () => boolean,
  ...forms: UseForm[]
): UseForm => {
  return {
    fields: forms.reduce(
      (fields, form) => ({
        ...fields,
        ...form.fields,
      }),
      {}
    ),
    isFormValid: isFormValid(),
    setFormFields: (fieldsToUpdate) =>
      applyFunctionToFormWithFields(fieldsToUpdate, forms, 'setFormFields'),
    updateMultipleFields: (fieldsToUpdate) =>
      applyFunctionToFormWithFields(
        fieldsToUpdate,
        forms,
        'updateMultipleFields'
      ),
    resetForm: () => forms.forEach((form) => form.resetForm()),
  };
};

export default combineForms;
