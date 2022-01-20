import React, { useState } from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';
<<<<<<< HEAD
import { lang } from './Components.language';
import ToolTip from './ToolTip';

import Icon, { Icons } from 'src/core/Icon';
import ErrorIcon from 'src/core/Icon/ErrorIcon';
import SuccessIcon from 'src/core/Icon/SuccessIcon';
=======
import ToolTip from './ToolTip';

import Icon, { Icons } from 'src/core/Icon';
>>>>>>> 5689fc9688307835c169832b31948acc2c0f46b5

interface Props {
  field: GenericObject;
  className?: string;
  IconStyle?: any;
  footerMessage?: any;
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
    IconStyle,
    footerMessage,
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
            {toolTipText && (
              <ToolTip
                arrow={true}
                content={<span>{toolTipText}</span>}
                interactive={true}
              >
<<<<<<< HEAD
                <RowTitleIcon icon={Icons.QUESTION_CIRCLE} />
=======
                <RowTitleIcon icon={Icons.TOOLTIP} />
>>>>>>> 5689fc9688307835c169832b31948acc2c0f46b5
              </ToolTip>
            )}
          </>
        </Label>
      )}
      <InputContainer
        id={id}
        type={type}
        showError={showError}
        isEmpty={!error && isEmpty(value)}
        placeholder={placeholder}
        value={value}
        onChange={handleValidation(onChange)}
        onBlur={handleValidation(onBlur)}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        disabled={disabled}
        displayCheck={displayCheck}
        autoFocus={autofocus}
        name={name}
        maxLength={maxlength}
        autocomplete={autocomplete}
        data-qa={dataQa}
        ref={innerRef}
      />
      <FooterMessage>{footerMessage}</FooterMessage>
      {showError ? (
        <>
<<<<<<< HEAD
          <StyledErrorIcon label="error" />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </>
      ) : (
        !isEmpty(value) && displayCheck && <StyledSuccessIcon label="success" />
=======
          <InputIcon icon={Icons.ERROR} top={IconStyle} />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </>
      ) : (
        !isEmpty(value) &&
        displayCheck && (
          <InputIcon icon={Icons.CHECKMARK_CIRCLE} top={IconStyle} />
        )
>>>>>>> 5689fc9688307835c169832b31948acc2c0f46b5
      )}
    </Container>
  );
};

const isEmpty = (value: any) => {
  return !value || 0 === value.length;
};

export default Input;

const StyledErrorIcon = styled(({ ...restProps }) => (
  <ErrorIcon {...restProps} />
))`
  position: absolute;
  right: 10px;
  top: ${(props) => props.top || '30px'};
  fill: #308406;
`;

const StyledSuccessIcon = styled(({ ...restProps }) => (
  <SuccessIcon {...restProps} />
))`
  position: absolute;
  right: 10px;
  top: ${(props) => props.top || '30px'};
  fill: #308406;
`;

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
`;

const InputContainer = styled(({ ...restProps }) => <input {...restProps} />)`
  height: 40px;
  padding: 8px 10px;
  outline: none;
  appearance: none;
  border: solid 1px #d6d7da;
  border-radius: 0;
  font-family: Calibre-Regular;
  font-size: 18px;
  line-height: 18px;
  @include set-font(regular, 18px, 22px, 0.25px);
  letter-spacing: 0.25px;
  ${(props) => props.isEmpty && `background-color: #ffffff`}
  ${(props) => props.showError && `border-color: #f26900`}

  &:focus {
    border-color: #1960d0;
    background-color: #ffffff;
  }

  &:disabled {
    background: #f5f5f5;
    color: #041022;
  }

  &::placeholder {
    color: #999da3;
  }

  &::-ms-clear {
    display: none;
  }
`;

const ErrorMessage = styled.span`
  font-family: Calibre-Bold;
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 1px;
  margin-top: 3px;
  color: #f26900;
  text-transform: uppercase;
`;

const FooterMessage = styled.div`
  padding-top: 10px;
`;

const RowTitleIcon = styled(Icon)`
  margin-left: 5px;
`;
