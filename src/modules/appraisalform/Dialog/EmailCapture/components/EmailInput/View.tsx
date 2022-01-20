import { addStyleForMobile, Button, Typography } from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { GenericObject } from 'src/interfaces.d';

interface Props {
  handleEmailSubmit: any;
  viewModel: ViewModel;
}

// eslint-disable-next-line react/prop-types
const EmailInputView: React.FC<Props> = ({ handleEmailSubmit, viewModel }) => {
  const [email, changeEmail] = useState({ value: '', error: true });

  const handleEmailChange = (e: GenericObject) => {
    const value = e.target.value;
    const error = !viewModel.isValidEmail(value);
    changeEmail({ ...email, value, error });
  };

  const onhandleEmailSubmit = (e: GenericObject) => {
    e.preventDefault();
    if (!email.error) {
      handleEmailSubmit(email.value);
    }
  };

  return (
    <Container>
      <LableText>Email</LableText>
      <InputContainer>
        <Input
          value={email.value}
          onChange={handleEmailChange}
          autoFocus
          placeholder={'Email address'}
        />
        <SubmitButton onClick={onhandleEmailSubmit} disabled={email.error}>
          SUBMIT
        </SubmitButton>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${addStyleForMobile(`
    flex-direction: column;
  `)}
`;

const LableText = styled(Typography.Body.Regular)`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  height: 100%;
  width: 280px;
  margin-right: 16px;
  height: 45px;
  padding: 12px 16px;
  border: 1px solid #999da3;
  ${addStyleForMobile(`
    width: 100%;
    margin: 0;
  `)}
  ::placeholder {
    color: #999da3;
  }
`;

const SubmitButton = styled(Button.Primary)`
  display: flex;
  justify-content: center;
  height: 45px;
  width: 168px;
  ${addStyleForMobile(`
    width: 100%;
    margin-top: 0;
    height: 48px;
    margin-top: 16px;
  `)}
`;

export default EmailInputView;
