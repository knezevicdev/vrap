import { FormField } from '../components/componentInterfaces.d';

const valueOrNo = (field: FormField): FormField => {
  return {
    ...field,
    value: field.value ? field.value : 'No',
  };
};

export default valueOrNo;
