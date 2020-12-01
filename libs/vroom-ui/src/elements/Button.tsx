import React from 'react';
import styled, { css } from 'styled-components';

import { ThemeProps } from '../foundation/themes/types';
import { addOpacityToHex } from '../foundation/themes/util';

const bodyFamily = (props: { theme: ThemeProps }): string =>
  props.theme.typography.family.body;
const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;
const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;
const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;
const secondaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.secondary.brand;
const grayTwo = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.two;
const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const base = css`
  min-height: 48px;
  max-height: 48px;
  padding: 0 32px;
  border: none;
  cursor: pointer;
  width: max-content;
  font-family: ${bodyFamily};
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;

  color: ${primaryWhite};
  white-space: nowrap;
`;

const Primary = styled.button`
  ${base}
  ${(props): string => {
    if (props.disabled) {
      return `
        background: ${grayThree(props)};
        color: ${grayTwo(props)};
        cursor: default;
      `;
    } else {
      return `
        background: ${primaryBrand(props)};
        :hover {
            background: #d01118;
        }
        :focus {
            outline: 4px solid ${addOpacityToHex(secondaryBrand(props), 20)};
        }
        `;
    }
  }}
`;

const Secondary = styled.button`
  ${base}
  ${(props): string => {
    if (props.disabled) {
      return `
        background: ${grayThree(props)};
        color: ${grayTwo(props)};
        cursor: default;
      `;
    } else {
      return `
          background: ${primaryBlack(props)};
          :focus {
              outline: 4px solid ${addOpacityToHex(secondaryBrand(props), 20)};
          }
        `;
    }
  }}
`;

const Outline = styled.button`
  ${base}
  background: ${primaryWhite};
  ${(props): string => {
    if (props.disabled) {
      return `
          color: ${grayTwo(props)};
          border: solid 2px ${grayTwo(props)};
          cursor: default;
        `;
    } else {
      return `
          color: ${primaryBrand(props)};
          border: solid 2px ${primaryBrand(props)};
          :hover {
              background: ${addOpacityToHex(primaryBrand(props), 10)};
          }
          :focus {
              outline: 4px solid ${addOpacityToHex(secondaryBrand(props), 20)};
          }
        `;
    }
  }}
`;

const Bare = styled.button`
  ${base}
  background: ${primaryWhite};

  ${(props): string => {
    if (props.disabled) {
      return `
        color: ${grayTwo(props)};
        cursor: default;
        `;
    } else {
      return `
        color: ${primaryBrand(props)};
        :hover {
            background: ${addOpacityToHex(primaryBlack(props), 10)};
        }
        :focus {
            outline: 4px solid ${addOpacityToHex(secondaryBrand(props), 20)};
        }
        `;
    }
  }}
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

export const Button = {
  Primary: PrimaryButton,
  Secondary: SecondaryButton,
  Bare: BareButton,
  Outline: OutlineButton,
};
