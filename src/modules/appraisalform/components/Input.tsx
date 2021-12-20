import success_icon from '@static/icons/svg/checkmark-circle.svg';
import error_icon from '@static/icons/svg/error.svg';
import tooltip_icon from '@static/icons/svg/tooltip.svg';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

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
  display: flex;
`;

const InputContainer = styled.input`
  height: 40px;
  padding: 8px 10px;
  outline: none;
  appearance: none;
  border: solid 1px ${(props) => props.theme.colors.gray3};
  border-radius: 0;
  ${(props) => props.theme.typography.h9()}
  @include set-font(regular, 18px, 22px, 0.25px);
  letter-spacing: 0.25px;
  ${(props) =>
    props.isEmpty && `background-color: ${props.theme.colors.white};`}
  ${(props) => props.showError && `border-color: ${props.theme.colors.orange};`}

  &:focus {
    border-color: ${(props) => props.theme.colors.vroomBlue};
    background-color: ${(props) => props.theme.colors.white};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.gray4};
    color: ${(props) => props.theme.colors.dark};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray2};
  }

  &::-ms-clear {
    display: none;
  }
`;

const ErrorMessage = styled.span`
  ${(props) => props.theme.typography.h16('bold')}
  margin-top: 3px;
  color: ${(props) => props.theme.colors.orange};
  text-transform: uppercase;
`;

const FooterMessage = styled.div`
  padding-top: 10px;
`;

const RowTitleIcon = styled(Icon)`
  margin-left: 5px;
`;
