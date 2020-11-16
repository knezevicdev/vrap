import { Field } from 'formik';
import React from 'react';

import { CoreInput, CoreInputProps } from './CoreInput';

const FormikInput: React.FC<CoreInputProps> = (props) => {
  return (
    <Field name={props.name}>
      {({ field, meta }: any) => {
        return (
          <CoreInput
            {...props}
            {...field}
            error={meta.error}
            touched={meta.touched}
          />
        );
      }}
    </Field>
  );
};

export default FormikInput;
