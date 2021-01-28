import { Input } from '@vroom-web/temp-ui-alias-for-checkout';
import { useField } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';

import { FormProps } from '../registration/types';

const Container = styled.div``;

const StyledInput = styled(Input)`
  width: 100%;
  font-size: 18px;
  line-height: 18px;
`;

const CustomInput: FC<FormProps> = (props) => {
  const [field, { error, value, touched }] = useField(props);
  const errorMessage = error && (value || touched) ? error : undefined;
  return (
    <Container>
      <StyledInput {...field} {...props} error={errorMessage} />
    </Container>
  );
};

export default CustomInput;
