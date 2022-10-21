import { UseForm } from '../components/componentInterfaces.d';

const anyFieldSelected = (
  form: UseForm,
  fields: string[],
  noFields?: string[]
): boolean => {
  return (
    fields.some((field) => form.fields[field].value === 'Yes') ||
    (noFields || []).some((field) => form.fields[field].value === 'No')
  );
};

export default anyFieldSelected;
