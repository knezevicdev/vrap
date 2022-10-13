import { ChangeEvent } from 'react';

import { FormField } from '../components/componentInterfaces.d';

type InvalidateField =
  | {
      field: string;
      invert: boolean;
    }
  | string;

function handleCheckChange(
  fields: Record<string, FormField>,
  fieldKey: string,
  updateMultipleFields: (fieldsToUpdate: Record<string, FormField>) => void,
  invalidateFields?: InvalidateField[],
  invert?: boolean
) {
  return (event: ChangeEvent<HTMLInputElement>): void => {
    const field = fields[fieldKey];
    const isChecked = event.target.checked;
    const fieldsToUpdate = {
      [fieldKey]: {
        ...field,
        value: (invert ? !isChecked : isChecked) ? 'Yes' : 'No',
      },
    };

    if (invalidateFields && event.target.checked) {
      for (const invalidateField of invalidateFields) {
        const fieldKey =
          typeof invalidateField === 'string'
            ? invalidateField
            : invalidateField.field;
        const isInvert =
          typeof invalidateField === 'string' ? false : invalidateField.invert;

        const field = fields[fieldKey];
        fieldsToUpdate[fieldKey] = {
          ...field,
          value: isInvert ? 'Yes' : 'No',
        };
      }
    }

    updateMultipleFields(fieldsToUpdate);
  };
}

export default handleCheckChange;
