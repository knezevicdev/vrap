import { FormField } from '@app/components/componentInterfaces.d';
import { getCustomOptions, getOptions } from '@app/lib/utils/selectUtils.js';
import React from 'react';
import styled from 'styled-components';

import { arrowPath } from '../assets/assets';
import Icon from './Icon';

const success_icon = require('@static/icons/svg/checkmark-circle.svg');

interface DropdownProps {
  field: FormField;
  className: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  field: {
    label,
    value,
    error = false,
    errorMessage = `please select a ${label}`,
    onChange,
    onBlur,
    onKeyPress,
    disabled,
    type,
    customOptions,
    defaultLabel,
    options = customOptions
      ? getCustomOptions(defaultLabel, customOptions)
      : getOptions(type),
  },
  className,
}) => {
  return (
    <Container className={className}>
      <Label>{label}</Label>
      <SelectContainer
        error={error}
        errorMessage={errorMessage}
        isEmpty={!error && isEmpty(value)}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        disabled={disabled}
      >
        {options}
      </SelectContainer>
      {!error && !isEmpty(value) && !isDefault(value, label) && (
        <SuccessIcon id={success_icon} />
      )}
      <SelectArrow src={arrowPath} />
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

const isEmpty = (value) => {
  return !value || 0 === value.length;
};

const isDefault = (value, label) => {
  return value === label;
};

export default Dropdown;

const SuccessIcon = styled(Icon)`
  position: absolute;
  right: 30px;
  top: 31px;
  fill: ${(props) => props.theme.colors.green};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  ${(props) => props.theme.typography.h14()}
  margin-bottom: 5px;
  letter-spacing: 0.35px;
`;

const SelectContainer = styled.select`
  height: 40px;
  padding: 8px 10px;
  font-size: 18px;
  line-height: 18px;
  border-radius: 0;
  display: inline-block;
  cursor: pointer;
  outline: 0;
  letter-spacing: -0.3px;
  color: ${(props) => props.theme.colors.dark};
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray3};

  ${(props) =>
    props.isEmpty &&
    `background-color: ${props.theme.colors.white};
    color: ${props.theme.colors.gray2};
  `}
  ${(props) => props.error && `border-color: ${props.theme.colors.orange};`}
  ${(props) => props.theme.media.mobile} {
    padding: 0 30px 0 10px;
    -webkit-padding-end: 45px;
    -webkit-padding-start: 10px;
  }

  &::-ms-expand {
    display: none;
  }
`;

const SelectArrow = styled.img`
  position: absolute;
  top: 34px;
  right: 8px;
  width: 12px;
  height: auto;
  pointer-events: none;
  border-width: 8px 5px 0 5px;
`;

const ErrorMessage = styled.span`
  ${(props) => props.theme.typography.h16('bold')}
  margin-top: 3px;
  color: ${(props) => props.theme.colors.orange};
  text-transform: uppercase;
`;
