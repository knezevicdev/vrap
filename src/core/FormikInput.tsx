import { Field } from 'formik';
import React from 'react';

import { CoreInput, CoreInputProps } from './CoreInput';

interface FormikProps {
  field: any;
  meta: {
    error: string | undefined;
    touched: boolean | undefined;
  };
}

const FormikInput: React.FC<CoreInputProps> = (props) => {
  return (
    <Field name={props.name}>
      {({ field, meta }: FormikProps): JSX.Element => {
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
