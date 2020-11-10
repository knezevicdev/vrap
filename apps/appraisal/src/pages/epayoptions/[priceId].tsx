import { SimpleHeader } from '@vroom-web/header-components';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import ToolFooter from 'src/core/ToolFooter';
import Options from 'src/modules/options';
import { OptionsStore, OptionsStoreContext } from 'src/modules/options/store';
import PaymentOverview from 'src/modules/paymentoverview';
import {
  PaymentOverviewStore,
  PaymentOverviewStoreContext,
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
}

const { publicRuntimeConfig } = getConfig();

const EPayOptions: NextPage<Props> = ({ brand }) => {
  const router = useRouter();
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;
  const priceId = router.query.priceId as string;

  const oStore = new OptionsStore(priceId);
  const poStore = new PaymentOverviewStore(priceId);

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

  return { brand };
};

export default EPayOptions;
