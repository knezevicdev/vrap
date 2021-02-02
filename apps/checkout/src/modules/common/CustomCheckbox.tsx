import { Body } from '@vroom-web/temp-ui-alias-for-checkout';
import { useField } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';

import { FormProps } from '../registration/types';

const Container = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
  align-items: center;
`;

const CustomCheckbox: FC<FormProps> = (props) => {
  const [field] = useField(props);
  const { label, name } = props;
  return (
    <Container>
      <input {...field} {...props} />
      <label htmlFor={name}>
        <Body.Small>{label}</Body.Small>
      </label>
    </Container>
  );
};

export default CustomCheckbox;
