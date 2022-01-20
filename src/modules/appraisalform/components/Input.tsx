import React, { useState } from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';
import ToolTip from './ToolTip';

import Icon, { Icons } from 'src/core/Icon';

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
                <RowTitleIcon icon={Icons.TOOLTIP} />
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
          <InputIcon icon={Icons.ERROR} top={IconStyle} />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </>
      ) : (
        !isEmpty(value) &&
        displayCheck && (
          <InputIcon icon={Icons.CHECKMARK_CIRCLE} top={IconStyle} />
        )
      )}
    </Container>
  );
};

const isEmpty = (value: any) => {
  return !value || 0 === value.length;
};

export default Input;

const InputIcon = styled(({ ...restProps }) => <Icon {...restProps} />)`
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
