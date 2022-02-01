import { Tooltip } from '@vroom-web/ui-lib';
import getConfig from 'next/config';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH;

interface Props {
  field: GenericObject;
  className?: string;
}

const RadioInput: React.FC<Props> = ({
  field: { options, onClick, label, name, checked, tooltipText = '' },
  className,
}) => {
  const [active, setActive] = useState<Element>();

  useEffect(() => {
    const handleFocusIn = () => {
      if (document.activeElement !== null) {
        setActive(document.activeElement);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  const handleKeyPress = (event: GenericObject) => {
    if (event.key === ' ' && active === event.currentTarget) {
      event.currentTarget.click();
      event.preventDefault();
    }
  };
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
              <OptionLabel htmlFor={`${item.label}${name}`}>
                <HiddenNativeRadio
                  type="radio"
                  id={`${item.label}${name}`}
                  value={item.label}
                  name={name}
                  tabIndex={-1}
                  onClick={() => onClick(item.label)}
                  defaultChecked={checked === item.label}
                />
                <CheckMark />
                <StyledRadio
                  value={item.label}
                  name={name}
                  tabIndex={0}
                  onClick={() => onClick(item.label)}
                  onKeyPress={handleKeyPress}
                />
                <RadioTextContainer>
                  {item.label}
                  <OptionDescription>{item.description}</OptionDescription>
                </RadioTextContainer>
              </OptionLabel>
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
  font-weight: normal;
`;

const RadioContainer = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

const CheckMark = styled.span`
  position: absolute;
  top: 6px;
  left: 6px;
  height: 16px;
  width: 16px;
  background-color: #ffffff;
  border: 1px solid #d6d7da;
  border-radius: 50%;
  &:hover {
    background-color: #fafafa;
  }
  z-index: -1;

  &:after {
    content: '';
    position: absolute;
    display: none;
  }
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
  &:checked ~ ${CheckMark} {
    background: url(${BASE_PATH}/icons/check-mark-red.svg);
    background-size: cover;
    border: 1px solid #e7131a;
    z-index: 4;
  }
`;

const StyledRadio = styled(({ ...restProps }) => <div {...restProps} />)`
  border: 1px solid #d6d7da;
  border-radius: 8px;

  width: 18px;
  height: 18px;
  margin: 5px;
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
  display: flex;

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

  button {
    margin-left: 5px;
    height: auto;
  }
`;

export default RadioInput;
