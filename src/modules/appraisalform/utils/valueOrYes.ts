import { FormField } from '../components/componentInterfaces.d';

const valueOrYes = (field: FormField): FormField => {
  return {
    ...field,
    value: field.value ? field.value : 'Yes',
  };
};

export default valueOrYes;
