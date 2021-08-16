import { Field } from 'formik';
import React from 'react';
import styled from 'styled-components';

import ENVS from 'src/integrations/Envs';

interface YesNoBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  id?: string;
  children?: string;
  name: string;
  disabled?: boolean;
  checked?: boolean;
  value: string;
  styleType: string;
}

const CheckMark = styled.span<{ disabled?: boolean }>`
  visibility: hidden;
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

const Label = styled.label<{
  disabled?: boolean;
  checked?: boolean;
}>`
  display: block;
  position: relative;
  padding: 8px 0;
  text-align: center;
  cursor: pointer;
  font-family: Calibre;
  font-size: 18px;
  font-weight: 500;
  color: ${({ checked }): string => (!checked ? '#999DA3' : '#041022')};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &.checkMail {
    font-weight: 600;
  }

  &:hover {
    span {
      background-color: ${({ disabled }): string =>
        !disabled ? '#fafafa' : ''};
    }
  }
`;

const YesNoBoxStyled = styled(Field).attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  visibility: hidden;

  &:checked ~ ${CheckMark} {
    background: url(${ENVS.BASE_PATH}/icons/check-mark-red.svg);
    background-size: cover;
    border: ${({ disabled }): string =>
      disabled ? `1px solid #999DA3` : `1px solid #E7131A`};
  }
`;

export const YesNoBox: React.FC<YesNoBoxProps> = (props) => {
  const { id, name, value, checked, children, disabled, styleType } = props;

  return (
    <Label
      disabled={disabled}
      checked={checked}
      className={styleType ? styleType : ''}
    >
      {children}
      <YesNoBoxStyled
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

YesNoBox.defaultProps = {
  disabled: false,
  styleType: '',
};

export default YesNoBox;
