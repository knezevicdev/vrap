import { useABSmartly } from '@vroom-web/analytics-integration';
import { SkipNavigationLink } from '@vroom-web/ui-lib';
import { IncomingMessage } from 'http';
import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Header } from 'src/components/Header';
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
import Page from 'src/Page';

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 5;
`;

const ColumnBody = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px;
  flex-wrap: wrap;
  min-height: ${(props: Partial<PaymentMethodContextType>): string =>
    props.stateDropdownOpen ? '115vh' : '81vh'};

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

const EPayOptions: NextPage = () => {
  const router = useRouter();
  const priceId = router.query.priceId as string;

  const oStore = new OptionsStore();
  const ddStore = new DirectDepositStore();
  const poStore = new PaymentOverviewStore();
  const absmartly = useABSmartly();

  const [stateDropdownOpen, setStateDropdown] = useState(false);

  useEffect(() => {
    const storedPriceId = localStorage.getItem('priceId');
    if (priceId !== storedPriceId) {
      localStorage.setItem('priceId', priceId);
    }
    oStore.init(priceId);
    ddStore.initClientSide(priceId);
    poStore.init(priceId);
  }, [oStore, ddStore, poStore, priceId]);

  return (
    <PaymentMethodContext.Provider
      value={{ stateDropdownOpen, setStateDropdown }}
    >
      <Page name="Payment Method">
        {!absmartly.isLoading && (
          <SkipNavigationLink mainContentId={'main-content'} />
        )}
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        {!absmartly.isLoading && (
          <>
            <ColumnBody id="main-content" stateDropdownOpen={stateDropdownOpen}>
              <OptionsStoreContext.Provider value={oStore}>
                <PaymentOverviewStoreContext.Provider value={poStore}>
                  <DirectDepositStoreContext.Provider value={ddStore}>
                    <Options />
                  </DirectDepositStoreContext.Provider>
                  <PaymentOverview />
                </PaymentOverviewStoreContext.Provider>
              </OptionsStoreContext.Provider>
            </ColumnBody>
          </>
        )}
        <ToolFooter />
      </Page>
    </PaymentMethodContext.Provider>
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
    return { uuid: '', ajs_anonymous_id: '' };
  }
};

EPayOptions.getInitialProps = async (
  context: NextPageContext
): Promise<Record<string, unknown>> => {
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

  return {};
};

export default observer(EPayOptions);
