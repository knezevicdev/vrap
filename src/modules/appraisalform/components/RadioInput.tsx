import { Tooltip } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';

interface Props {
  field: GenericObject;
  className?: string;
}

const RadioInput: React.FC<Props> = ({
  field: { options, onClick, label, name, selected, tooltipText = '' },
  className,
}) => {
  return (
    <Container className={className}>
      <LabelContainer>
        <Label>{label}</Label>
        {tooltipText && <Tooltip content={<span>{tooltipText}</span>} />}
      </LabelContainer>
      <div data-qa="SelectBoxesComponent">
        {options.map((item: any) => {
          return (
            <RadioContainer key={item.label}>
              <HiddenNativeRadio
                type="radio"
                id={`${item.label}${name}`}
                value={item.label}
                name={name}
                onClick={() => onClick(item.label)}
                selected={selected}
              />
              <StyledRadio
                type="radio"
                id={`${item.label}${name}`}
                value={item.label}
                name={name}
                onClick={() => onClick(item.label)}
                selected={selected}
              />
              <RadioTextContainer>
                <OptionLabel htmlFor={`${item.label}${name}`}>
                  {item.label}
                  <OptionDescription>{item.description}</OptionDescription>
                </OptionLabel>
              </RadioTextContainer>
            </RadioContainer>
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
`;

const Label = styled.h3`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
`;

const RadioContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const HiddenNativeRadio = styled(({ ...restProps }) => (
  <input {...restProps} />
))`
  /* Hide checkbox visually but remain accessible to screen readers.
  Source: https://polished.js.org/docs/#hidevisually */
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const CheckMark = styled.span<{ disabled?: boolean }>`
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

const StyledRadio = styled(({ ...restProps }) => <div {...restProps} />)`
  border: 1px solid #d6d7da;
  border-radius: 8px;

  width: 16px;
  height: 16px;
  margin: 5px;

  &:checked ~ ${CheckMark} {
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${({ disabled }): string =>
      disabled ? `1px solid #999DA3` : `1px solid #E7131A`};
    div {
      display: inline-block;
    }
  }
`;

const RadioTextContainer = styled.div`
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const OptionLabel = styled.label`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
  margin-bottom: 0px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const OptionDescription = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  line-height: 1.71;
  width: 355px;

  @media (max-width: 768px) {
    width: 100%;
    line-height: 20px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

export default RadioInput;
