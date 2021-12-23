import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { radioSelected } from '../assets/assets';
import tooltip_icon from '../static/icons/svg/tooltip.svg';
import Icon from './Icon';
import ToolTip from './ToolTip';

const RadioInput = ({
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
            <RowTitleIcon id={tooltip_icon} />
          </ToolTip>
        )}
      </LabelContainer>
      <div data-qa="SelectBoxesComponent">
        {options.map((item) => {
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

const HiddenNativeRadio = styled.input`
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

const StyledRadio = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray3};
  border-radius: 8px;

  width: 16px;
  height: 16px;
  margin: 5px;

  ${(props) =>
    props.selected === props.value &&
    `background: url(${radioSelected}); background-size: cover;`}
`;

const RadioTextContainer = styled.div`
  ${(props) => props.theme.media.lte('mobile')} {
    width: 90%;
  }
`;

const OptionLabel = styled.label`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
  margin-bottom: 0px;
  cursor: pointer;

  ${(props) => props.theme.media.lte('mobile')} {
    font-size: 16px;
  }
`;

const OptionDescription = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  line-height: 1.71;
  width: 355px;

  ${(props) => props.theme.media.lte('mobile')} {
    width: 100%;
    line-height: 20px;
  }
`;

const RowTitleIcon = styled(Icon)`
  margin: 8px 0 0 5px;

  ${(props) => props.theme.media.mobile} {
    margin: 4px 0 0 5px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

RadioInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  tooltipText: PropTypes.string,
};

export default RadioInput;
