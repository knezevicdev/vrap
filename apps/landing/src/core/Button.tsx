import React from 'react';
import styled, { css } from 'styled-components';

interface ThemeProps {
  typography: {
    family: {
      hero: string;
      title: string;
      body: string;
    };
    color: string;
  };
}

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
  margin: 4px;

  font-family: ${bodyFamily};
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;

  color: white;
  white-space: nowrap;
`;

const Primary = styled.button`
  ${base}
  background: ${(props): string => (props.disabled ? '#D6D7DA' : '#e7131a')};

  &:hover {
    background: ${(props): string => (props.disabled ? '#D6D7DA' : '#FC4349')};
  }
  
  &:active {
    background: ${(props): string => (props.disabled ? '#D6D7DA' : '#e7131a')};
    box-shadow: 0 0 0 ${(props): string =>
      props.disabled ? '0px' : '4px'} #fcd6d7;
  }
`;

const Secondary = styled(Primary)`
  background: ${(props): string => (props.disabled ? '#D6D7DA' : '#041022')};

  &:hover {
    background: ${(props): string => (props.disabled ? '#D6D7DA' : '#6C717A')};
  }

  &:active {
    background: ${(props): string => (props.disabled ? '#D6D7DA' : '#041022')};
  }
`;

const Bare = styled(Primary)`
  background: transparent;
  margin: 0px;
  color: ${(props): string => (props.disabled ? '#D6D7DA' : '#E7131A')};

  &:hover {
    background: transparent;
    color: ${(props): string => (props.disabled ? '#D6D7DA' : '#FC4349')};
  }

  &:active {
    background: transparent;
    box-shadow: none;
    color: ${(props): string => (props.disabled ? '#D6D7DA' : '#E7131A')};
  }
`;

const Outline = styled(Primary)`
  background: transparent;
  color: ${(props): string => (props.disabled ? '#D6D7DA' : '#E7131A')};
  border: 2px solid
    ${(props): string => (props.disabled ? '#D6D7DA' : '#E7131A')};

  &:hover {
    background: transparent;
    color: ${(props): string => (props.disabled ? '#D6D7DA' : '#FC4349')};
    border: 2px solid
      ${(props): string => (props.disabled ? '#D6D7DA' : '#FC4349')};
  }

  &:active {
    background: transparent;
    color: ${(props): string => (props.disabled ? '#D6D7DA' : '#E7131A')};
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

const BareButton: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  disabled,
}) => {
  return (
    <Bare className={className} disabled={disabled} onClick={onClick}>
      {children}
    </Bare>
  );
};

const OutlineButton: React.FC<ButtonProps> = ({
  className,
  children,
  onClick,
  disabled,
}) => {
  return (
    <Outline className={className} disabled={disabled} onClick={onClick}>
      {children}
    </Outline>
  );
};

export const Button = {
  Primary: PrimaryButton,
  Secondary: SecondaryButton,
  Bare: BareButton,
  Outline: OutlineButton,
};
