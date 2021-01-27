import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { SimpleHeader } from '@vroom-web/header-components';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import { IncomingMessage } from 'http';
import { NextPage, NextPageContext } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import ToolFooter from 'src/core/ToolFooter';
import {
  DirectDepositStore,
  DirectDepositStoreContext,
} from 'src/modules/directdeposit/store';
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
  min-height: 79vh;

  @media (max-width: 1280px) {
    flex-wrap: wrap-reverse;
    align-content: flex-end;
    min-height: 86vh;
  }

  @media (max-width: 786px) {
    flex-wrap: wrap-reverse;
    min-height: 81vh;
  }

  @media (max-width: 420px) {
    padding: 0;
    min-height: auto;
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
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('lg'));

  const oStore = new OptionsStore(priceId);
  const ddStore = new DirectDepositStore(priceId);
  const poStore = new PaymentOverviewStore(priceId, mdUp);

  return (
    <ThemeProvider brand={brand}>
      <Page name="EPayOptions">
        <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
        <SuccessBar />
        <ColumnBody>
          <OptionsStoreContext.Provider value={oStore}>
            <DirectDepositStoreContext.Provider value={ddStore}>
              <Options />
            </DirectDepositStoreContext.Provider>
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
