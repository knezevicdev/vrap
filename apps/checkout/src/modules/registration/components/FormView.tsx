import {
  addStyleForMobile,
  Button,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { Form } from 'formik';
import React, { FC } from 'react';
import styled from 'styled-components';

import CustomCheckbox from '../../common/CustomCheckbox';
import CustomInput from '../../common/CustomInput';
import { FormValues } from '../types';
import LegalCopy from './LegalCopy';
import PasswordStrength from './PasswordStrength';

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

const NameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  ${addStyleForMobile(`
  grid-template-columns: 1fr;
`)}
`;

interface Props {
  isValid: boolean;
  dirty: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: FormValues;
}

const FormView: FC<Props> = (props) => {
  const { isValid, dirty, handleChange, handlePhone, values } = props;

  return (
    <Container>
      <StyledForm>
        <NameContainer>
          <CustomInput
            label="First Name"
            name="firstName"
            placeholder="First Name"
          />
          <CustomInput
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
          />
        </NameContainer>
        <CustomInput
          label="Email address"
          name="username"
          type="email"
          placeholder="example@example.com"
        />
        <CustomInput
          label="Phone number"
          name="phone"
          placeholder="(  ) ___-____"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            handlePhone(e);
            handleChange(e);
          }}
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password (min 8 characters)"
        />
        <PasswordStrength passwordInput={values.password} />
        <LegalCopy />
        <CustomCheckbox
          label="I want to receive communications about Vroom news and offers."
          type="checkbox"
          name="optIn"
        />
        <StyledButton type="submit" disabled={!(isValid && dirty)}>
          Join
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

export default FormView;
