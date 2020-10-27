import { SimpleHeader } from '@vroom-web/header-components';
import { NextPage } from 'next';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import Footer from 'src/core/Footer';
import Page from 'src/Page';
import Options from 'src/modules/options';
import PaymentOverview from 'src/modules/paymentoverview';

const ColumnBody = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px;
`;

interface Props {
  initialState?: any;
}

const { publicRuntimeConfig } = getConfig();

const EPayOptions: NextPage<Props> = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <Page name="EPayOptions">
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <ColumnBody>
        <Options />
        <PaymentOverview />
      </ColumnBody>
      <Footer />
    </Page>
  );
};

EPayOptions.getInitialProps = async ({ query }): Promise<Props> => {
  const offerId = query.offerId as string;
  const initialState = { offer: offerId };
  return { initialState };
};

export default EPayOptions;
