import { Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { arrowPath } from '../assets/assets';
import { FormField } from './componentInterfaces.d';
import { getCustomOptions, getOptions } from './selectUtils';

import Icon, { Icons } from 'src/core/Icon';

interface DropdownProps {
  field: FormField;
  className?: string;
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
        <SuccessIcon icon={Icons.CHECKMARK_CIRCLE} />
      )}
      <SelectArrow src={arrowPath} />
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
};

const isEmpty = (value: any) => {
  return !value || 0 === value.length;
};

const isDefault = (value: any, label: any) => {
  return value === label;
};

export default Dropdown;

const SuccessIcon = styled(Icon)`
  position: absolute;
  right: 30px;
  top: 31px;
  fill: #308406;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled(Typography.Body.Regular)`
  font-size: 13px;
  line-height: 13px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  letter-spacing: 0.35px;
`;

const SelectContainer = styled(({ ...restProps }) => <select {...restProps} />)`
  height: 40px;
  padding: 8px 10px;
  font-size: 18px;
  line-height: 18px;
  border-radius: 0;
  display: inline-block;
  cursor: pointer;
  outline: 0;
  letter-spacing: -0.3px;
  color: #041022;
  background-color: #ffffff;
  border: 1px solid #d6d7da;

  ${(props) =>
    props.isEmpty &&
    `background-color: #ffffff;
    color: #999da3;
  `}
  ${(props) => props.error && `border-color: #f26900;`}

  @media (max-width: 767px) {
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

const ErrorMessage = styled(Typography.Body.Regular)`
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 1px;
  margin-top: 3px;
  color: #f26900;
  text-transform: uppercase;
`;
