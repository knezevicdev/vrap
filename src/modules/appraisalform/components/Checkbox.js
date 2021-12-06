import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckedBoxIconRed from '@static/bg/checked-box-red.svg';

export default function Checkbox({ className, field }) {
  const {
    checked = false,
    label = '',
    onChange = () => {},
    value = '',
    imgSrc = ''
  } = field;

  const handleOnClick = () => {
    onChange({ ...field, checked: !checked });
  };

  return (
    <LabelContainer checked={checked}>
      <CheckboxContainer className={className}>
        <HiddenNativeCheckbox
          checked={checked}
          onChange={onChange}
          value={value}
        />
        <StyledCheckbox checked={checked} onClick={handleOnClick} />
      </CheckboxContainer>
      {imgSrc && <ImgContainer src={imgSrc} />}
      <Label onClick={handleOnClick}>{label}</Label>
    </LabelContainer>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  field: PropTypes.shape({
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
  }).isRequired
};

/*** Styled components ***/

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`;

const HiddenNativeCheckbox = styled.input.attrs({ type: 'checkbox' })`
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

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-width: 1px;
  border-style: solid;
  transition: all 150ms;

  ${props =>
    props.checked &&
    `background: url(${CheckedBoxIconRed}); background-size: cover;`}
`;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;

  /* https://www.styled-components.com/docs/advanced#referring-to-other-components */

  &:not(:hover) ${StyledCheckbox} {
    border-color: ${props =>
      props.checked ? props.theme.colors.gray4 : props.theme.colors.gray3};
  }

  &:hover ${StyledCheckbox} {
    border-color: ${props => props.theme.colors.gray4};
  }
`;

const ImgContainer = styled.img`
  height: 15px;
  width: 22px;
  margin-top: 2px;
  margin-right: 8px;
`;

const Label = styled.span`
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.3px;
`;
