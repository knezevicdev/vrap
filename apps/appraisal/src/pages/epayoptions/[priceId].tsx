import { SimpleHeader } from '@vroom-web/header-components';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import ToolFooter from 'src/core/ToolFooter';
import Options from 'src/modules/options';
import {
  getInitialOptionsStoreState,
  OptionsStore,
  OptionsStoreContext,
  OptionStoreState,
} from 'src/modules/options/store';
import PaymentOverview from 'src/modules/paymentoverview';
import {
  getInitialPaymentOverviewStoreState,
  PaymentOverviewStore,
  PaymentOverviewStoreContext,
  PaymentOverviewStoreState,
} from 'src/modules/paymentoverview/store';
import SuccessBar from 'src/modules/successbar';
import Page from 'src/Page';

const ColumnBody = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px;
  flex-wrap: wrap;

  @media (max-width: 786px) {
    flex-wrap: wrap-reverse;
  }

  @media (max-width: 420px) {
    padding: 0;
  }
`;

interface Props {
  brand: Brand;
  optionsInitialState: OptionStoreState;
  paymentInitialState: PaymentOverviewStoreState;
}

const { publicRuntimeConfig } = getConfig();

const EPayOptions: NextPage<Props> = ({
  brand,
  optionsInitialState,
  paymentInitialState,
}) => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;
  const oStore = new OptionsStore(optionsInitialState);
  const poStore = new PaymentOverviewStore(paymentInitialState);

  return (
    <ThemeProvider brand={brand}>
      <Page name="EPayOptions">
        <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
        <SuccessBar />
        <ColumnBody>
          <OptionsStoreContext.Provider value={oStore}>
            <Options />
          </OptionsStoreContext.Provider>
          <PaymentOverviewStoreContext.Provider value={poStore}>
            <PaymentOverview />
          </PaymentOverviewStoreContext.Provider>
        </ColumnBody>
        <ToolFooter />
      </Page>
    </ThemeProvider>
  );
};

EPayOptions.getInitialProps = async (
  context: NextPageContext
): Promise<Props> => {
  const { req, query } = context;

  const headerBrandKey = 'x-brand';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;

  let brand = Brand.VROOM;
  const whitelabel = brandHeader || queryBrand;
  if (whitelabel === Brand.SANTANDER) brand = Brand.SANTANDER;
  else if (whitelabel === Brand.TDA) brand = Brand.TDA;

  const priceId = query.priceId as string;
  const optionsInitialState = await getInitialOptionsStoreState(priceId);
  const paymentInitialState = await getInitialPaymentOverviewStoreState(
    priceId
  );
  return { brand, optionsInitialState, paymentInitialState };
};

export default EPayOptions;
