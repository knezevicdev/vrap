import { Input } from '@vroom-web/ui-lib';
import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';

interface FormikProps {
  field: any;
  meta: {
    error: string | undefined;
    touched: boolean | undefined;
  };
}

interface CoreInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  label: string;
  placeholder: string;
  value?: string;
  touched?: boolean;
  fluid?: boolean;
  appendComponent?: React.FC | null; //Allow to inject components below the text field
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: string[];
}

const FormikInput: React.FC<CoreInputProps> = (props) => {
  const {
    placeholder,
    name,
    error,
    label,
    className,
    value,
    disabled,
    type,
    fluid,
    appendComponent,
    ...rest
  } = props;

  const isSuccess = !!value && value.length > 0 && !!error && error.length > 0;

  return (
    <Field name={name}>
      {({ field, meta }: FormikProps): JSX.Element => {
        return (
          <Container className={className} fluid={fluid}>
            <Input
              {...rest}
              label={label}
              value={value}
              error={meta.error}
              placeholder={placeholder}
              name={name}
              id={name}
              disabled={disabled}
              type={type}
              success={isSuccess}
            />
            {appendComponent && appendComponent}
          </Container>
        );
      }}
    </Field>
  );
};

export default FormikInput;

interface ContainerProps {
  fluid?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
  width: ${({ fluid }): string => (fluid ? '100%' : 'min-content')};
`;
