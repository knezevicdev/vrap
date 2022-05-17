import { useEffect, useRef } from 'react';

import { UseForm } from 'src/modules/appraisalform/components/componentInterfaces.d';

export const useToggleRequiredFields = (
  form: UseForm,
  prefix: string,
  isRequired: boolean,
  excludeFields: string[] = []
): void => {
  const previousValue = useRef<boolean>();

  useEffect(() => {
    if (previousValue.current !== isRequired) {
      previousValue.current = isRequired;
      form.updateMultipleFields(
        Object.fromEntries(
          Object.entries(form.fields)
            .filter(
              ([key]) => key.startsWith(prefix) && !excludeFields.includes(key)
            )
            .map(([key, field]) => [
              key,
              {
                ...field,
                isRequired,
                value: !isRequired ? '' : field.value,
              },
            ])
        )
      );
    }
  }, [prefix, form, isRequired, excludeFields]);
};
