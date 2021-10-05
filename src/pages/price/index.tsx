import { IncomingMessage } from 'http';
import { observer } from 'mobx-react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import AsyncIndicator from 'src/components/AsyncIndicator';
import { Header } from 'src/components/Header';
import { useAppStore } from 'src/context';
import Footer from 'src/core/Footer';
import PriceInfo from 'src/modules/price';
import { PriceStore } from 'src/modules/price/store';
import ProgressiveAd from 'src/modules/progressiveAd';
import Questions from 'src/modules/questions';
import Page from 'src/Page';

const Price: NextPage = () => {
  const router = useRouter();
  const priceId = router.query.priceId as string;
  const store = new PriceStore(priceId);
  const appStore = useAppStore();

  return (
    <Page name="Price">
      <Header />
      {!appStore.store.absmart.loading && (
        <Contents>
          <PriceInfo store={store} />
          <ProgressiveAd store={store} />
          <Questions />
        </Contents>
      )}
      <Footer />
      <AsyncIndicator store={store} />
    </Page>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, query } = context;
  const priceId = query.priceId as string;
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
  return { props: {} };
};

export default observer(Price);
