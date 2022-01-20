import React from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';
import { radioSelected } from '../assets/assets';
import ToolTip from './ToolTip';

import Icon, { Icons } from 'src/core/Icon';

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
        {tooltipText && (
          <ToolTip
            arrow={true}
            content={<span>{tooltipText}</span>}
            interactive={true}
          >
            <RowTitleIcon icon={Icons.QUESTION_CIRCLE} />
          </ToolTip>
        )}
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

const StyledRadio = styled(({ ...restProps }) => <div {...restProps} />)`
  border: 1px solid #d6d7da;
  border-radius: 8px;

  width: 16px;
  height: 16px;
  margin: 5px;

  ${(props) =>
    props.selected === props.value &&
    `background: url(${radioSelected}); background-size: cover;`}
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

const RowTitleIcon = styled(Icon)`
  margin: 8px 0 0 5px;

  @media (max-width: 767px) {
    margin: 4px 0 0 5px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

export default RadioInput;
