import {
  Button,
  Link,
  ThemeProps,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { Form } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';

import CustomInput from '../../common/CustomInput';
import { LoginProps } from '../types';

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

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const ForgotPasswordLink = styled(Link)`
  font-size: inherit;
  text-decoration: underline;
  width: fit-content;
  :hover {
    color: ${primaryBrand};
  }
`;

const LoginForm: FC<LoginProps> = (props) => {
  const { isValid, dirty, forgotPassword } = props;
  return (
    <Container>
      <StyledForm>
        <CustomInput
          label="Email address"
          name="username"
          type="email"
          placeholder="example@example.com"
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password (min 8 characters)"
        />
        <ForgotPasswordLink href={forgotPassword.href}>
          {forgotPassword.text}
        </ForgotPasswordLink>
        <StyledButton type="submit" disabled={!(isValid && dirty)}>
          LOG IN
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

export default LoginForm;
