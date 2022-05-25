import { ThemeProps } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../interfaces.d';

interface Props {
  field: GenericObject;
  className?: string;
}

const Textarea: React.FC<Props> = ({
  field: {
    label,
    placeholder,
    value = '',
    onChange,
    maxlength,
    height,
    dataQa,
  },
  className,
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

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const grayTwo = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.two;

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
  height: ${(props) => props.height || 'auto'};
  resize: none;
  padding: 5px 9px;
  font-size: 18px;
  border: 1px solid ${grayTwo};
  background-color: ${primaryWhite};
  color: ${primaryBlack};
  outline: none;
  border-radius: 0;
  box-shadow: none;
  line-height: 24px;
  font-family: Calibre-Regular;

  &::placeholder {
    color: ${grayTwo};
    opacity: 1;
  }
`;

export default Textarea;
