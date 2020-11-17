import React from 'react';
import styled from 'styled-components';

import ErrorIcon from './Icon/ErrorIcon';
import SuccessIcon from './Icon/SuccessIcon';

export interface CoreInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
  label: string;
  placeholder: string;
  value?: string;
  touched?: boolean;
  fluid?: boolean;
  appendComponent?: React.FC | null; //Allow to inject components below the text field
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CoreInput: React.FC<CoreInputProps> = (props) => {
  const {
    placeholder,
    name,
    error,
    label,
    className,
    touched,
    value,
    disabled,
    type,
    fluid,
    appendComponent,
    ...rest
  } = props;

  const _showError = error && touched;
  const _isEmpty = value && value.length === 0;
  const _showSuccess = value && value.length > 0 && !_showError;

  return (
    <Container className={className} fluid={fluid}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <InputContainer
        {...rest}
        value={value}
        showerror={_showError ? 1 : 0}
        isempty={!_showError && _isEmpty}
        placeholder={placeholder}
        name={name}
        id={name}
        disabled={disabled}
        type={type}
        fluid={fluid ? 1 : 0}
      />
      {_showError && (
        <>
          <ErrorIcon label={label} />
          <ErrorMessage>{error}</ErrorMessage>
        </>
      )}
      {_showSuccess && <SuccessIcon label={label} />}
      {appendComponent && appendComponent}
    </Container>
  );
};

export default CoreInput;

CoreInput.defaultProps = {
  disabled: false,
  fluid: false,
};

interface ContainerProps {
  fluid?: boolean;
}

const Label = styled.label`
  margin-bottom: 5px;
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
  width: ${({ fluid }): string => (fluid ? '100%' : 'min-content')};
`;

const InputContainer = styled(
  //Removing showError, isEmpty, theme, fluid, setFieldValue from the rest props to pass down all HTMLInput properties
  ({ ...rest }) => <input {...rest} />
)`
  height: 40px;
  width: ${({ fluid }): string => (fluid ? '100%' : 'auto')};
  box-sizing: border-box;
  padding: 8px 10px;
  outline: none;
  appearance: none;
  border-radius: 0;
  letter-spacing: 0.25px;
  border: solid 1px #D6D7DA;

  ${(props): string => props.isEmpty && `background-color: #FFF;`}

  ${(props): string => props.showError && `border-color: #F26900;`}

  &:active {
    border-color: #1960D0;
    background-color: #FFF;

  &:focus {
    border-width: 1px;
    background-color: #FFF;

  &:disabled {
    background: #f5f5f5;
    color: #6C717A;
  }

  &::placeholder {
    color: #999DA3;
  }

  &::-ms-clear {
    display: none;
  }
`;

const ErrorMessage = styled.span`
  font-family: ${(props): string => props.theme.typography.family.body};
  margin-top: 3px;
  color: #f26900;
  text-transform: uppercase;
  font-weight: 600;
`;
