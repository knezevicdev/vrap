import { uniqueId } from 'lodash';
import { useState } from 'react';

const getInitialState = (defaultValues: any, autofocus?: any) => {
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

const addEvents = (fields: any, events: any, customEvents: any) => {
  return Object.keys(fields).reduce((result, key) => {
    return {
      ...result,
      [key]: {
        ...result[key],
        onChange: events.onChange(key),
        id: uniqueId(),
        ...customEvents,
      },
    };
  }, fields);
};

const isFormValid = (fields: any, customValidationFunction: any) => {
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

  if (customValidationFunction) {
    const isValid = customValidationFunction(fields);
    return !fieldsHaveErrors && !isValid;
  } else {
    return !fieldsHaveErrors;
  }
};

const useForm = (props: any) => {
  const {
    defaultValues,
    autofocus = true,
    customEvents,
    customValidationFunction,
  } = props;

  const [fields, setFields] = useState(
    getInitialState(defaultValues, autofocus)
  );

  const onChange = (key: any) => (field: any) => {
    setFields({ ...fields, [key]: field });
  };

  const setFormFields = (value: any) => {
    setFields(getInitialState(value));
  };

  const updateMultipleFields = (fieldsToUpdate: any) => {
    setFields({ ...fields, ...fieldsToUpdate });
  };

  const resetForm = () => {
    setFields(initResetForm(fields));
  };

  // customEvents structure - { event: function }
  // ex: { onBlur: handleOnBlur }
  // TODO: extend useForm to take any event type and allow it to execute setFields
  const fieldsWithEvents = addEvents(fields, { onChange }, customEvents);

  return {
    fields: fieldsWithEvents,
    isFormValid: isFormValid(fields, customValidationFunction),
    setFormFields,
    updateMultipleFields,
    resetForm,
  };
};

export default useForm;
