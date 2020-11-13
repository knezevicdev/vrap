import { SimpleHeader } from '@vroom-web/header-components';
import { IncomingMessage } from 'http';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import Footer from 'src/core/Footer';
import ENVS from 'src/integrations/Envs';
import PriceInfo from 'src/modules/price';
import {
  getInitialPriceStoreState,
  PriceStore,
  PriceStoreContext,
} from 'src/modules/price/store';
import Questions from 'src/modules/questions';
import Page from 'src/Page';

interface Props {
  store: PriceStore;
}

const Price: NextPage<Props> = ({ store }) => {
  const gearboxPrivateUrl = ENVS.GEARBOX_PRIVATE_URL;
  //   const router = useRouter();
  //   const priceId = router.query.priceId as string;
  //   const store = new PriceStore(priceId);

  return (
    <Page name="Home">
      <PriceStoreContext.Provider value={store}>
        <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
        <PriceInfo />
        <Questions />
        <Footer />
      </PriceStoreContext.Provider>
    </Page>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // automated price
  // http://localhost:3000/appraisal/price/e93bafe0b739241f875d1e3c35416fff

  // manual price
  // http://localhost:3000/appraisal/price/d9b61a51f993808577a102eecbe8df0d

  const priceId = context.query.priceId as string;
  const store = await getInitialPriceStoreState(priceId);

  const req = context.req;
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
  return { props: { store } };
};

export default Price;
