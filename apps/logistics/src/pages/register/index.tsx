import { NextPage } from 'next';
import React from 'react';

import Register, { RegisterContext } from 'src/modules/register';
import RegisterModel from 'src/modules/register/Model';
import Page from 'src/Page';

const RegisterPage: NextPage = () => {
  const model = new RegisterModel();
  return (
    <Page name="Registration" description="Carrier Portal">
      <RegisterContext.Provider value={model}>
        <Register />
      </RegisterContext.Provider>
    </Page>
  );
};

export default RegisterPage;
