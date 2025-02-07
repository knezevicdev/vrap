import { Input as VroomInput, Tooltip } from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';

interface Props {
  field: GenericObject;
  className?: string;
}

const Input: React.FC<Props> = (props) => {
  const {
    field: {
      label,
      placeholder,
      value = '',
      error = false,
      errorMessage = `please enter a valid ${label}`,
      onChange,
      onBlur,
      onKeyPress,
      onFocus,
      type = 'text',
      displayCheck = true,
      disabled,
      autofocus,
      showLabel = true,
      name,
      maxlength,
      toolTipText,
      id = '',
      autocomplete = 'off',
      dataQa,
      forceValidate,
    },
    className,
  } = props;

  const [shouldValidate, setValidate] = useState(false);

  const handleValidation = (action: any) => (event: any) => {
    if (!shouldValidate) {
      setValidate(true);
    }
    if (action) {
      action(event);
    }
  };

  const showError = (shouldValidate || forceValidate) && error;

  return (
    <Container className={className}>
      {showLabel && (
        <Label>
          <>
            {label}
            {toolTipText && <Tooltip content={<span>{toolTipText}</span>} />}
          </>
        </Label>
      )}
      <BaseInput
        id={id}
        label={''}
        type={type}
        error={showError ? errorMessage : undefined}
        success={!isEmpty(value) && displayCheck}
        placeholder={placeholder}
        value={value}
        onChange={handleValidation(onChange)}
        onBlur={handleValidation(onBlur)}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        disabled={disabled}
        autoFocus={autofocus}
        name={name}
        maxLength={maxlength}
        autoComplete={autocomplete}
        data-qa={dataQa}
      />
    </Container>
  );
};

const isEmpty = (value: unknown) => {
  return !value || (Array.isArray(value) && 0 === value.length);
};

export default Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  font-family: Calibre-Regular, sans-serif;
  font-size: 13px;
  line-height: 13px;
  margin-bottom: 4px;
  letter-spacing: 0.35px;
  display: flex;

  button {
    width: 13px;
    height: 13px;
    margin-left: 5px;

    svg {
      min-width: 13px;
      min-height: 13px;
      max-width: 13px;
      max-height: 13px;
    }
  }
`;

const BaseInput = styled(VroomInput)`
  margin-bottom: 10px;

  div:first-child {
    margin: 0;
  }
`;
