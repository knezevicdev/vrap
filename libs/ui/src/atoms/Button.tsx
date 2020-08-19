import React from 'react';
import styled, { css } from 'styled-components';

import { ThemeProps } from '../themes/types';

interface CSSProps {
  theme: ThemeProps;
}

const bodyFamily = (props: CSSProps): string =>
  props.theme.typography.family.body;

const base = css`
  border: none;
  cursor: pointer;

  min-height: 48px !important;
  max-height: 48px !important;
  height: 48px !important;
  width: max-content;
  padding: 0 32px;

  font-family: ${bodyFamily};
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;

  color: white;
`;

const Primary = styled.button`
  ${base}
  background: ${(props): string => (props.disabled ? '#D6D7DA' : '#e7131a')};

  &:active {
    box-shadow: 0 0 0 ${(props): string =>
      props.disabled ? '0px' : '4px'} #fcd6d7;
  }
`;

const Secondary = styled(Primary)`
  background: ${(props): string => (props.disabled ? '#D6D7DA' : '#041022')};

  &:hover {
    background: ${(props): string => (props.disabled ? '#D6D7DA' : '#6C717A')};
  }
`;

export interface ButtonProps {
  className?: string;
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  disabled,
}) => {
  return (
    <Primary className={className} disabled={disabled} onClick={onClick}>
      {children}
    </Primary>
  );
};

const SecondaryButton: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  disabled,
}) => {
  return (
    <Secondary className={className} disabled={disabled} onClick={onClick}>
      {children}
    </Secondary>
  );
};

export class Button {
  static Primary = PrimaryButton;
  static Secondary = SecondaryButton;
}
