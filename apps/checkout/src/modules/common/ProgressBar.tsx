import React from 'react';
import styled from 'styled-components';
import {
    addStyleForMobile,
    ThemeProps,
  } from '@vroom-web/temp-ui-alias-for-checkout';

interface ProgressBar {
  steps: string[];
  activeStep: number;
}


const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

  const grayTwo = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.two;

  const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

  const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const ProgressBarWrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
`;

const Step = styled.li<{ active: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:after {
    background-color: ${({ active }) =>
      active && primaryBrand};
  }

  &:last-child {
    &:after {
      width: 100%;
      transform: translateX(-50%);
    }
  }

  &:first-child {
    &:after {
      width: 50%;
      transform: translateX(50%);
    }
  }

  &:after {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    top: 9px;
    background-color: ${({ active }) =>
      active ? primaryBrand : grayTwo};
    z-index: 0;
    transform: translateX(-50%);
  }
`;

const LowerText = styled.span<{ active: boolean }>`
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  display: block;
  margin: 5px 5px 0 5px;

  ${addStyleForMobile(`
  font-size: 10px;
  `)}

  color: ${({ active }) =>
    active ? primaryBlack : grayTwo};
`;

const Dot = styled.span<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  display: inline-block;
  background-color: ${({ active }) =>
    active ? primaryBrand : grayTwo};
  border: 4px solid ${primaryWhite};
`;

export const ProgressBar: React.FC<ProgressBar> = ({ steps, activeStep }) => {
  return (
    <ProgressBarWrapper>
      {steps.map((step, index) => {
        const isActive = index + 1 <= activeStep;
        return (
          <Step key={step} active={isActive}>
            <Dot active={isActive} />
            <LowerText active={isActive}>{step}</LowerText>
          </Step>
        );
      })}
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
