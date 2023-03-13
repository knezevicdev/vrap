import { ChangeEvent } from 'react';

import { FormField } from 'src/modules/appraisalform/components/componentInterfaces.d';

export const inputChange =
  (field: FormField, required = false) =>
  (event: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string): void => {
    const value = typeof event === 'string' ? event : event.target.value;

    field.onChange({
      ...field,
      value,
      error: required ? value.length < 1 : false,
    });
  };
