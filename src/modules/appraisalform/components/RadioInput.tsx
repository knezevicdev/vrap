import { Radio as VroomRadio, RadioGroup, Tooltip } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';

interface Props {
  field: GenericObject;
  className?: string;
}

const RadioInput: React.FC<Props> = ({
  field: {
    options,
    onClick,
    label,
    name,
    checked,
    tooltipText = '',
    id,
    value,
    forceValidate,
  },
  className,
}) => {
  const error = forceValidate && !value ? 'Please select one option' : '';

  return (
    <Container className={className} id={id}>
      <LabelContainer>
        <Label>{label}</Label>
        {tooltipText && <Tooltip content={<span>{tooltipText}</span>} />}
      </LabelContainer>
      <div data-qa="SelectBoxesComponent">
        <RadioGroup>
          {options.map((item: GenericObject) => {
            return (
              <Radio
                key={item.label}
                checked={checked === item.label}
                onChange={() => onClick(item.label)}
                name={name}
                value={item.label}
                id={`${item.label}${name}`}
                dataQa={`${item.label}${name}`}
              >
                <RadioTextContainer>
                  {item.label}
                  <OptionDescription>{item.description}</OptionDescription>
                </RadioTextContainer>
              </Radio>
            );
          })}
        </RadioGroup>
      </div>
      {error && <ErrorFeedback>{error}</ErrorFeedback>}
    </Container>
  );
};

const ErrorFeedback = styled.div`
  font-family: Calibre, sans-serif;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #f26900;
`;

const Container = styled.div`
  cursor: pointer;
`;

const Label = styled.h3`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
  margin: 0;
  font-weight: normal;
`;

const Radio = styled(VroomRadio)`
  margin-bottom: 10px;

  label {
    align-items: baseline;
  }

  label:before {
    top: 3px;
    margin: 0 5px;
  }

  @media (max-width: 768px) {
    width: 90%;
    font-size: 16px;
  }
`;

const RadioTextContainer = styled.div`
  font-size: 18px;
  line-height: 1.39;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const OptionDescription = styled.div`
  font-size: 14px;
  text-align: left;
  line-height: 1.71;
  letter-spacing: 0.3px;
  width: 355px;

  @media (max-width: 768px) {
    width: 100%;
    line-height: 20px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
  margin: 0 0 8px;

  button {
    margin-left: 5px;
    height: auto;
  }
`;

export default RadioInput;
