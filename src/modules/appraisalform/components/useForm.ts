import { useCallback, useMemo, useState } from 'react';

import { FormField } from './componentInterfaces.d';

const getInitialState = (
  defaultValues: any,
  autofocus?: any
): Record<string, FormField> => {
  return Object.keys(defaultValues).reduce((result, key, idx) => {
    let value,
      imgSrc,
      isRequired = true;
    const autofocusVal = autofocus && idx === 0;
    if (typeof defaultValues[key] === 'object') {
      value = defaultValues[key] ? defaultValues[key].value : null;
      isRequired = defaultValues[key]
        ? defaultValues[key].isRequired
        : isRequired;
      imgSrc = defaultValues[key] ? defaultValues[key].imgSrc : null;
    } else {
      value = defaultValues[key];
    }

    return {
      ...result,
      [key]: {
        value,
        error: false,
        isRequired,
        autofocus: autofocusVal,
        imgSrc,
      },
    };
  }, {});
};

const initResetForm = (fields: any) => {
  return Object.keys(fields).reduce((result, key) => {
    let value;
    const fieldValue = fields[key].value;
    if (typeof fieldValue === 'boolean') {
      value = false;
    } else if (Array.isArray(fieldValue)) {
      value = [];
    } else if (typeof fieldValue === 'string') {
      value = '';
    } else {
      value = null;
    }

    return {
      ...result,
      [key]: {
        value,
        error: false,
        isRequired: fields[key].isRequired,
        autofocus: fields[key].autofocus,
      },
    };
  }, {});
};

const calcIsFormValid = (fields: any) => {
  const fieldsHaveAnEmptyValue = Object.keys(fields).some((key) => {
    // check if check boxes are false and required
    // check if string is empty and required
    // check if is array and is empty and required
    // check if all else (usually numbers) are null and required
    return (
      (fields[key].checked === false ||
        fields[key].value === '' ||
        (Array.isArray(fields[key].value) && fields[key].value.length === 0) ||
        fields[key].value === null ||
        fields[key].value === undefined) &&
      fields[key].isRequired
    );
  });

  const fieldsHaveErrors = Object.keys(fields)
    .map((key) => {
      return fields[key].error;
    })
    .some((error) => error === true);

  if (fieldsHaveAnEmptyValue) return false;

  return !fieldsHaveErrors;
};

const useForm = (props: any) => {
  const { defaultValues, autofocus = true, formKey } = props;

  const [fields, setFields] = useState(
    getInitialState(defaultValues, autofocus)
  );

  const onChange = useCallback(
    (key: any) => (field: Record<string, any>) => {
      const errorChanged = fields[key] && fields[key].error !== field.error;
      const setForceValidate = field.setForceValidate;
      delete field.setForceValidate;

      let error = field.isRequired ? !field.value : false;
      if (errorChanged) error = field.error;

      setFields({
        ...fields,
        [key]: {
          ...field,
          forceValidate: !!setForceValidate,
          error,
        },
      });
    },
    [fields]
  );

  const setFormFields = useCallback((value: any) => {
    setFields(getInitialState(value));
  }, []);

  const updateMultipleFields = useCallback(
    (fieldsToUpdate: any) => {
      setFields({ ...fields, ...fieldsToUpdate });
    },
    [fields]
  );

  const resetForm = useCallback(() => {
    setFields(initResetForm(fields));
  }, [fields]);

  const fieldsWithEvents = useMemo(() => {
    return Object.fromEntries(
      Object.entries(fields).map(([key, field]) => {
        return [
          key,
          {
            ...field,
            onChange: onChange(key),
            id: `${formKey}-${key}`,
          },
        ];
      })
    );
  }, [fields, onChange]);

  const isFormValid = useMemo(() => calcIsFormValid(fields), [fields]);

  return {
    fields: fieldsWithEvents,
    isFormValid,
    setFormFields,
    updateMultipleFields,
    resetForm,
  };
};

export default useForm;
