import { SimpleHeader } from '@vroom-web/header-components';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import { IncomingMessage } from 'http';
import { NextPage, NextPageContext } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import experimentSDK from 'src/integrations/experimentSDK';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

import ToolFooter from 'src/core/ToolFooter';
import {
  DirectDepositStore,
  DirectDepositStoreContext,
} from 'src/modules/directdeposit/store';
import Options from 'src/modules/options';
import {
  PaymentMethodContext,
  PaymentMethodContextType,
} from 'src/modules/options/paymentMethodContext';
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
  min-height: ${(props: Partial<PaymentMethodContextType>): string =>
    props.stateDropdownOpen ? '115vh' : '79vh'};

  @media (max-width: 1280px) {
    flex-wrap: wrap-reverse;
    align-content: flex-end;
    min-height: ${(props: Partial<PaymentMethodContextType>): string =>
      props.stateDropdownOpen ? '130vh' : '86vh'};
  }

  @media (max-width: 786px) {
    flex-wrap: wrap-reverse;
    min-height: ${(props: Partial<PaymentMethodContextType>): string =>
      props.stateDropdownOpen ? '150vh' : '81vh'};
  }

  @media (max-width: 420px) {
    padding: 0;
    min-height: ${(props: Partial<PaymentMethodContextType>): string =>
      props.stateDropdownOpen ? '180vh' : 'auto'};
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
  const ddStore = new DirectDepositStore(priceId);
  const poStore = new PaymentOverviewStore(priceId);
  const [stateDropdownOpen, setStateDropdown] = useState(false);
  const [analyticsHandler] = useState<AnalyticsHandler>(new AnalyticsHandler());

  // TODO: Haven't tested this where it's set to 1 yet
  // gotta force the variant to make sure it works
  useEffect(() => {
    experimentSDK
      .getAndLogExperimentClientSide('cw-plaid-experiment')
      .then((experiment) => ddStore.setPlaidExperiment(experiment));
  }, [ddStore]);

  useEffect(() => {
    if (ddStore.plaidExperiment) {
      analyticsHandler.registerExperiment(ddStore.plaidExperiment);
    }
  }, [ddStore.plaidExperiment]);


  return (
    <ThemeProvider brand={brand}>
      <PaymentMethodContext.Provider
        value={{ stateDropdownOpen, setStateDropdown }}
      >
        <Page name="EPayOptions">
          <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
          <SuccessBar />
          <ColumnBody stateDropdownOpen={stateDropdownOpen}>
            <OptionsStoreContext.Provider value={oStore}>
              <DirectDepositStoreContext.Provider value={ddStore}>
                <Options />
              </DirectDepositStoreContext.Provider>
              <PaymentOverviewStoreContext.Provider value={poStore}>
                <PaymentOverview />
              </PaymentOverviewStoreContext.Provider>
            </OptionsStoreContext.Provider>
          </ColumnBody>
          <ToolFooter />
        </Page>
      </PaymentMethodContext.Provider>
    </ThemeProvider>
  );
};

interface Cookie {
  uuid: string;
  ajs_anonymous_id: string;
}

const parseCookies = (req: IncomingMessage): Cookie => {
  if (req && req.headers && req.headers.cookie) {
    return Object.fromEntries(
      req.headers.cookie.split('; ').map((v) => v.split(/=(.+)/))
    );
  } else {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return { uuid: '', ajs_anonymous_id: '' };
  }
};

EPayOptions.getInitialProps = async (
  context: NextPageContext
): Promise<Props> => {
  const { req, query } = context;
  const priceId = query.priceId as string;

  if (req) {
    const cookies = parseCookies(req);

    const loggerInfo = {
      priceId,
      userAgent: req.headers['user-agent'],
      fastlyClientIp: req.headers['fastly-client-ip'],
      uuid: cookies['uuid'],
      ajsAnonymousId: cookies['ajs_anonymous_id'],
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      url: req.url,
    };
    console.log(JSON.stringify(loggerInfo));
  }

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
