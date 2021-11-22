import { Field } from 'formik';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH;

interface RadioButtonProps extends React.HTMLAttributes<HTMLInputElement> {
  id?: string;
  children?: React.ReactNode;
  name: string;
  disabled?: boolean;
  checked?: boolean;
  value: string;
  onClick?: (value: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  type: string;
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
    ${({ disabled }): string => (disabled ? '#999DA3' : '#D6D7DA')};

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
  font-weight: 500;
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
`;

const RadioButtonStyled = styled(Field).attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${CheckMark} {
    background: url(${BASE_PATH}/icons/check-mark-red.svg);
    background-size: cover;
    border: ${({ disabled }): string =>
      disabled ? `1px solid #999DA3` : `1px solid #E7131A`};
  }
`;

const InnerCircle = styled.div`
  display: none;
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #e7131a;
`;

const CircleRadioButton = styled(Field).attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${CheckMark} {
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${({ disabled }): string =>
      disabled ? `1px solid #999DA3` : `1px solid #E7131A`};
    div {
      display: inline-block;
    }
  }

  /* &:checked ~ ${InnerCircle} {
    display: inline-block;
  } */
`;

export const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const { id, name, value, checked, children, disabled, onClick, type } = props;

  return (
    <Label disabled={disabled}>
      {children}
      {type === 'circle' ? (
        <>
          <CircleRadioButton
            id={id}
            name={name}
            disabled={disabled}
            checked={checked}
            value={value}
            onClick={onClick}
          />
          <CheckMark disabled={disabled}>
            <InnerCircle />
          </CheckMark>
        </>
      ) : (
        <>
          <RadioButtonStyled
            id={id}
            name={name}
            disabled={disabled}
            checked={checked}
            value={value}
            onClick={onClick}
          />
          <CheckMark disabled={disabled} />
        </>
      )}
    </Label>
  );
};

RadioButton.defaultProps = {
  disabled: false,
  type: '',
};

export default RadioButton;
