import {
    Button,
  } from '@vroom-web/temp-ui-alias-for-checkout';
import { Form, FormikProps } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';
import LoginInput from './loginInput';
import { FormValues } from './types';

const StyledButton = styled(Button.Primary)`
  width: 100%;
  min-height: 45px;
`;

const Container = styled.div`
  margin: 16px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoginForm: FC<FormikProps<FormValues>> = (props) => {
    const { isValid, dirty } = props;
    return (
      <Container>
        <StyledForm>
          <LoginInput
            label="Email address"
            name="username"
            type="email"
            placeholder="example@example.com"
          />
          <LoginInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password (min 8 characters)"
          />
          {/* link for forget password */}
          <StyledButton type="submit" disabled={!(isValid && dirty)}>
            LOG IN
          </StyledButton>
        </StyledForm>
      </Container>
    );
  };
  
  export default LoginForm;
  

  