import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';

interface RadioButtonProps extends React.HTMLAttributes<HTMLInputElement> {
  id?: string;
  children?: string;
  name: string;
  disabled?: boolean;
  checked?: boolean;
  value: string;
}

const CheckMark = styled.span<{ disabled?: boolean }>`
  position: absolute;
  top: 3px;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: ${({ disabled }): string =>
    disabled ? '#f5f5f5' : '#fff'};
  border: 1px solid
    ${({ disabled }): string => (disabled ? '#999DA3' : '#041022')};

  border-radius: 50%;

  &:hover {
    background-color: ${({ disabled }): string => (!disabled ? '#fafafa' : '')};
  }

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
`;

const Label = styled.label<{ disabled?: boolean }>`
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 5px;
  cursor: pointer;
  font-family: Calibre;
  font-size: 18px;
  color: ${({ disabled }): string => (disabled ? '#999DA3' : '#041022')};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    span {
      background-color: ${({ disabled }): string =>
        !disabled ? '#fafafa' : ''};
    }
  }

  ${CheckMark}:after {
    left: 1px;
    top: 1px;
    width: 8px;
    height: 8px;
    border: solid '#fff';
    border-radius: 50%;
    background-color: ${({ disabled }): string => (!disabled ? '#999DA3' : '')};
  }
`;

const RadioButtonStyled = styled(Field).attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${CheckMark} {
    background-color: ${({ disabled }): string =>
      disabled ? '#f5f5f5' : '#E7131A'};

    border: ${({ disabled }): string =>
      disabled ? `1px solid #999DA3` : `1px solid #E7131A`};
  }

  &:checked ~ ${CheckMark}:after {
    display: block;
  }
`;

export const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const { id, name, value, checked, children, disabled } = props;

  return (
    <Label disabled={disabled}>
      {children}
      <RadioButtonStyled
        id={id}
        name={name}
        disabled={disabled}
        checked={checked}
        value={value}
      />
      <CheckMark disabled={disabled} />
    </Label>
  );
};

RadioButton.defaultProps = {
  disabled: false,
};

export default RadioButton;
