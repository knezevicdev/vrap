import React, { useState } from 'react';
import styled from 'styled-components';

import { ThemeProps } from './themes/Vroom';
import { addOpacityToHex } from './themes/util';
import { Body } from './Typography';
import Icon, { Icons } from './Icon/Icon';

export interface DropdownProps {
  id: string;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  onSelectCallback: (value: string, label: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const Dropdown = (props: DropdownProps): JSX.Element => {
  const {
    id,
    name,
    label: dropdownLabel,
    options,
    onSelectCallback,
    placeholder,
    className,
    error,
    disabled,
  } = props;

  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [labelPosition, setLabelPosition] = useState<number | undefined>(
    undefined
  );
  const actualLabel = label ? label : placeholder;
  const isShowingPlaceholder = label === undefined;
  const showError = (error && error !== '') || false;
  const onValueClick = (): void => {
    setOpen(!open);
  };

  const setSelection = (value: string, label: string): void => {
    setOpen(false);
    setLabel(label);
    onSelectCallback(value, label);
  };

  const onSelectClick = (value: string, label: string) => (): void => {
    setSelection(value, label);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const key = e.key;
    const menuIsClosed = !open;
    const menuIsOpen = open;

    switch (key) {
      case 'ArrowRight': {
        if (menuIsClosed) {
          if (labelPosition === undefined) {
            const { value, label } = options[0];
            setSelection(value, label);
            setLabelPosition(0);
          } else {
            const isNotAtTheEnd = labelPosition !== options.length - 1;
            if (isNotAtTheEnd) {
              const newPosition = labelPosition + 1;
              const { value, label } = options[newPosition];
              setSelection(value, label);
              setLabelPosition(newPosition);
            }
          }
        }
        break;
      }

      case 'ArrowLeft': {
        if (menuIsClosed && labelPosition !== undefined) {
          const isNotAtTheStart = labelPosition !== 0;
          if (isNotAtTheStart) {
            const newPosition = labelPosition - 1;
            const { value, label } = options[newPosition];
            setSelection(value, label);
            setLabelPosition(newPosition);
          }
        }
        break;
      }

      case 'ArrowDown': {
        if (menuIsOpen) {
          const isNotAtTheEnd = labelPosition !== options.length - 1;
          if (labelPosition === undefined) {
            setLabelPosition(0);
          } else if (isNotAtTheEnd) {
            setLabelPosition(labelPosition + 1);
          }
        } else if (menuIsClosed) {
          setOpen(true);
        }
        break;
      }

      case 'ArrowUp': {
        if (menuIsOpen) {
          const isNotAtTheStart = labelPosition !== 0;
          if (labelPosition === undefined) {
            setLabelPosition(0);
          } else if (isNotAtTheStart) {
            setLabelPosition(labelPosition - 1);
          }
        } else if (menuIsClosed) {
          setOpen(true);
        }
        break;
      }

      case 'Tab':
      case 'Enter': {
        if (menuIsOpen) {
          if (labelPosition !== undefined) {
            const { value, label } = options[labelPosition];
            setSelection(value, label);
          }
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <Container className={className}>
      <Body.Small>{dropdownLabel}</Body.Small>
      <LabelContainer
        onClick={disabled ? undefined : onValueClick}
        open={open}
        disabled={disabled}
        showError={showError}
        tabIndex={0}
        onKeyDown={disabled ? undefined : onKeyDown}
      >
        <Label isShowingPlaceholder={isShowingPlaceholder}>{actualLabel}</Label>
        {showError && <ErrorIcon icon={Icons.FEEDBACK_ERROR} />}
        <Arrow
          disabled={disabled}
          open={open}
          showError={showError}
          icon={Icons.CHEVRON_DOWN}
        />
      </LabelContainer>
      {showError && !open && <Error>{error}</Error>}
      {open && (
        <Divider showError={showError}>
          <DividerBorder />
        </Divider>
      )}
      <Menu open={open} showError={showError}>
        {options.map((option, index) => {
          const { value, label } = option;
          const manualHover = index === labelPosition;

          return (
            <Option
              key={value}
              onClick={onSelectClick(value, label)}
              manualHover={manualHover}
            >
              {label}
            </Option>
          );
        })}
      </Menu>
    </Container>
  );
};

Dropdown.defaultProps = {
  placeholder: 'Placeholder',
};

export default Dropdown;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const grayTwo = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.two;

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const grayFour = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.four;

const secondaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.secondary.brand;

const secondaryError = (props: { theme: ThemeProps }): string =>
  props.theme.colors.secondary.error;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  background: ${primaryWhite};
  position: relative;
`;

const LabelContainer = styled.div<{
  open: boolean;
  showError?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 7px 0px;
  cursor: ${(props): string => (props.disabled ? 'default' : 'pointer')};
  margin-top: 4px;
  border: 1px solid
    ${(props): string =>
      props.showError ? secondaryError(props) : grayThree(props)};

  ${(props): string | false | undefined =>
    props.disabled &&
    `
    background: ${grayFour(props)};
  `}
  ${(props): string | false | undefined =>
    props.open && `border-bottom: none; `}
  outline: none;

  ${(props): string | false | undefined =>
    !props.disabled &&
    `
      :focus {
        outline: 4px solid ${addOpacityToHex(secondaryBrand(props), 20)};
      }
  `}
`;

const Label = styled(Body.Regular)<{ isShowingPlaceholder: boolean }>`
  color: ${(props): string =>
    props.isShowingPlaceholder ? grayTwo(props) : primaryBlack(props)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
  user-select: none;
  line-height: 24px;
  margin-left: 16px;
`;

const Arrow = styled(Icon)<{
  open: boolean;
  showError?: boolean;
  disabled?: boolean;
}>`
  transform: rotate(${(props): string => (props.open ? '180deg' : '0deg')});
  transition: transform 250ms;
  ${(props): string | false | undefined =>
    !props.showError && 'margin-left: auto;'}
  ${(props): string | false | undefined =>
    props.disabled && `fill: ${grayThree(props)};`}
  margin-right: 16px;
  min-width: 12px;
`;

const ErrorIcon = styled(Icon)`
  margin-left: auto;
  margin-right: 16px;
  min-width: 16px;
`;

const Menu = styled.div<{
  open: boolean;
  showError?: boolean;
}>`
  display: ${(props): string => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  background: ${primaryWhite};
  max-height: 500px;
  overflow-y: scroll;
  position: absolute;
  top: 64px;
  left: 0px;
  right: 0px;
  border: 1px solid
    ${(props): string =>
      props.showError ? secondaryError(props) : grayThree(props)};
  border-top: none;
  padding-top: 8px;
`;

const Option = styled(Body.Regular)<{ manualHover: boolean }>`
  cursor: pointer;
  padding: 8px 16px;
  ${(props): string | false =>
    props.manualHover && `background: ${grayFour(props)};`}
  :hover {
    background: ${grayFour};
  }
`;

const Divider = styled.div<{ showError?: boolean }>`
  z-index: 1;
  height: 10px;
  background: ${primaryWhite};
  border-left: 1px solid
    ${(props): string =>
      props.showError ? secondaryError(props) : grayThree(props)};
  border-right: 1px solid
    ${(props): string =>
      props.showError ? secondaryError(props) : grayThree(props)};
`;

const DividerBorder = styled.div`
  height: 0px;
  border-top: solid 1px ${grayFour};
  margin: 0px 16px;
`;

const Error = styled(Body.Fine)`
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${secondaryError};
`;
