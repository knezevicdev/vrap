import { useEffect, useRef } from 'react';

import { UseForm } from 'src/modules/appraisalform/components/componentInterfaces.d';

export const useToggleRequiredFields = (
  form: UseForm,
  prefix: string,
  isRequired: boolean,
  optionalFields: string[] = []
): void => {
  const previousValue = useRef<boolean>();

  useEffect(() => {
    if (previousValue.current !== isRequired) {
      previousValue.current = isRequired;
      form.updateMultipleFields(
        Object.fromEntries(
          Object.entries(form.fields)
            .filter(([key]) => key.startsWith(prefix))
            .map(([key, field]) => [
              key,
              {
                ...field,
                isRequired: optionalFields.includes(key) ? false : isRequired,
                value: !isRequired ? '' : field.value,
                error: false,
              },
            ])
        )
      );
    }
  }, [prefix, form, isRequired, optionalFields]);
};
