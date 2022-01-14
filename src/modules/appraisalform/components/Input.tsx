import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import success_icon from '../static/icons/svg/checkmark-circle.svg';
import error_icon from '../static/icons/svg/error.svg';
import tooltip_icon from '../static/icons/svg/tooltip.svg';
import { lang } from './Components.language';
import Icon from './Icon';
import ToolTip from './ToolTip';

const Input = (props) => {
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

  const handleValidation = (action) => (event) => {
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
                <RowTitleIcon id={tooltip_icon} />
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
          <InputIcon id={error_icon} top={IconStyle} />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </>
      ) : (
        !isEmpty(value) &&
        displayCheck && <InputIcon id={success_icon} top={IconStyle} />
      )}
    </Container>
  );
};

const isEmpty = (value) => {
  return !value || 0 === value.length;
};

export default Input;

Input.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  IconStyle: PropTypes.string,
  footerMessage: PropTypes.element,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

const InputIcon = styled(Icon)`
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

const InputContainer = styled.input`
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
