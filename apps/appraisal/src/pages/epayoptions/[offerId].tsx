import { Brand, ThemeProvider } from '@vroom-web/ui';
import { SimpleHeader } from '@vroom-web/header-components';
import { NextPage, NextPageContext } from 'next';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import ToolFooter from 'src/core/ToolFooter';
import Page from 'src/Page';
import SuccessBar from 'src/modules/successbar';
import Options from 'src/modules/options';
import PaymentOverview from 'src/modules/paymentoverview';

const ColumnBody = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px;
`;

interface Props {
  brand: Brand,
  offer: string
}

const { publicRuntimeConfig } = getConfig();

const EPayOptions: NextPage<Props> = ({ brand }) => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <ThemeProvider brand={brand}>
      <Page name="EPayOptions">
        <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
        <SuccessBar />
        <ColumnBody>
          <Options />
          <PaymentOverview />
        </ColumnBody>
        <ToolFooter />
      </Page>
    </ThemeProvider>
  );
};

EPayOptions.getInitialProps = async (context: NextPageContext): Promise<Props> => {
  const { req, query } = context;

  const headerBrandKey = 'x-brand';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;

  let brand = Brand.VROOM;
  const whitelabel = brandHeader || queryBrand;
  if (whitelabel === Brand.SANTANDER) brand = Brand.SANTANDER;
  else if (whitelabel === Brand.TDA) brand = Brand.TDA;

  const offerId = query.offerId as string;
  return { brand, offer: offerId };
};

export default EPayOptions;
