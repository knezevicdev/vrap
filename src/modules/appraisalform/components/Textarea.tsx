import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Textarea = ({
  field: {
    label,
    placeholder,
    value = '',
    onChange,
    maxlength,
    height,
    dataQa
  },
  className
}) => {
  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <InputContainer
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxlength}
        height={height}
        data-qa={dataQa}
      />
    </Container>
  );
};

Textarea.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.3px;
  margin-bottom: 10px;
`;

const InputContainer = styled(({ height, ...restProps }) => (
  <textarea {...restProps} />
))`
  height: ${props => props.height || 'auto'};
  resize: none;
  padding: 5px 9px;
  border: 1px solid ${props => props.theme.colors.gray3};
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.dark};
  outline: none;
  border-radius: 0;

  &::placeholder {
    color: ${props => props.theme.colors.gray2};
    opacity: 1;
  }
`;

export default Textarea;
