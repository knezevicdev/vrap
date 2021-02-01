import { Checkbox } from '@material-ui/core';
import { Body, ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import { useField } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';

import { FormProps } from '../registration/types';

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const Container = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
  align-items: center;
`;

const StyledInput = styled(Checkbox)`
  padding: 0 !important;
  background-color: transparent !important;
  .MuiSvgIcon-root {
    fill: ${primaryBlack};
  }
`;

const CustomCheckbox: FC<FormProps> = (props) => {
  const [field] = useField(props);
  const { label, name } = props;
  return (
    <Container>
      <StyledInput disableRipple {...field} {...props} />
      <label htmlFor={name}>
        <Body.Small>{label}</Body.Small>
      </label>
    </Container>
  );
};

export default CustomCheckbox;
