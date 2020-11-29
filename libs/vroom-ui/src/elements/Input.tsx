import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../foundation/themes/types';
import { Body, Fine } from '../foundation/Typography';
import Icon, { Icons } from './Icon/Icon';

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  className?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  success?: boolean;
}

const Input = (props: InputProps): JSX.Element => {
  const {
    value,
    onChange,
    label,
    className,
    placeholder,
    error,
    disabled,
    success,
  } = props;

  const isDisabled = disabled === true;
  const hasError = error ? error !== '' : false;
  const hasSuccess = success ? success : value !== '';

  const showError = isDisabled ? false : hasError;
  const showSuccess = isDisabled ? false : hasSuccess;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <Container className={className}>
      <Body.Small>{label}</Body.Small>
      {showError ? (
        <CustomIconPosition icon={Icons.FEEDBACK_ERROR} />
      ) : (
        showSuccess && <CustomIconPosition icon={Icons.FEEDBACK_SUCCESS} />
      )}
      <CustomInput
        type="text"
        error={showError}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
      {showError && <Error>{error}</Error>}
    </Container>
  );
};

Input.defaultProps = {
  placeholder: 'Placeholder',
};

export default Input;

const textColor = (props: { theme: ThemeProps }): string =>
  props.theme.typography.color;

const grayTwo = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.two;

const grayFour = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.four;

const secondaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.secondary.brand;

const secondaryError = (props: { theme: ThemeProps }): string =>
  props.theme.colors.secondary.error;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  position: relative;
`;

const CustomInput = styled.input<{ error?: boolean }>`
  color: ${textColor};

  :disabled {
    color: ${grayTwo};
    background: ${grayFour};
  }

  padding: 12px 38px 12px 16px;
  margin: 4px 0px;
  line-height: 24px;
  font-size: 18px;
  letter-spacing: 0.25px;
  font-family: Calibre;
  border: solid 1px
    ${(props): string => (props.error ? secondaryError(props) : grayTwo(props))};
  outline: none;

  :focus {
    border: solid 1px ${secondaryBrand};
  }
`;

const CustomIconPosition = styled(Icon)`
  position: absolute;
  top: 42px;
  right: 18px;
`;

const Error = styled(Fine)`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${secondaryError};
`;
