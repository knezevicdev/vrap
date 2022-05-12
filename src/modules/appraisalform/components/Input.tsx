import { Input as VroomInput, Tooltip } from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';
import { lang } from './Components.language';

interface Props {
  field: GenericObject;
  className?: string;
  innerRef?: any;
}

const Input: React.FC<Props> = (props) => {
  const {
    field: {
      label,
      placeholder,
      value = '',
      error = false,
      errorMessage = lang.errorMessage(label),
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
    },
    className,
    innerRef,
  } = props;

  const [validate, setValidate] = useState(false);

  const handleValidation = (action: any) => (event: any) => {
    if (!validate) {
      setValidate(true);
    }
    if (action) {
      action(event);
    }
  };

  const showError = validate && error;

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
      <InputContainer
        id={id}
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
        ref={innerRef}
        displaycheck={displayCheck ? 'true' : 'false'}
        isempty={!error && isEmpty(value) ? 'true' : 'false'}
      />
    </Container>
  );
};

const isEmpty = (value: any) => {
  return !value || 0 === value.length;
};

export default Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  font-family: Calibre-Regular;
  font-size: 13px;
  line-height: 13px;
  margin-bottom: 5px;
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

const InputContainer = styled(VroomInput)`
  & input {
    height: 40px;
    padding: 8px 10px;
    border: solid 1px #d6d7da;
    border-radius: 0;
    box-shadow: none;
    font-family: Calibre-Regular;
    font-size: 18px;
    line-height: 18px;
    @include set-font(regular, 18px, 22px, 0.25px);
    letter-spacing: 0.25px;

    &:disabled {
      background: #f5f5f5;
      color: #041022;
    }

    &:focus {
      outline: -webkit-focus-ring-color auto;
      background-color: #ffffff;
    }

    &::placeholder {
      color: #999da3;
    }

    &::-ms-clear {
      display: none;
    }
  }

  & svg {
    top: 13px;
    right: 13px;
  } 

  & div:first-child {
    margin: 0;
  }
`;
