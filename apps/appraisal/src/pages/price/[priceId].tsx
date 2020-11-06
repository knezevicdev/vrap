import { SimpleHeader } from '@vroom-web/header-components';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
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
  // const router = useRouter();
  // const priceId = router.query.priceId as string;
  // const store = new PriceStore(priceId);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // automated price
  // http://localhost:3000/appraisal/price/e93bafe0b739241f875d1e3c35416fff

  // manual price
  // http://localhost:3000/appraisal/price/d9b61a51f993808577a102eecbe8df0d

  const priceId = context.query.priceId as string;
  const req = context.req;
  req['cookies'] = Object.fromEntries(
    req.headers.cookie.split('; ').map((v) => v.split(/=(.+)/))
  );
  console.log(req['cookies']);

  const loggerInfo = {
    priceId,
    userAgent: req.headers['user-agent'],
    fastlyClientIp: req.headers['fastly-client-ip'],
    uuid: req.cookies['uuid'],
    ajsAnonymousId: req.cookies['ajs_anonymous_id'],
    ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    url: req.url,
  };

  let store = {};
  const resp = await getInitialPriceStoreState(priceId);
  if (resp.err) {
    console.log(JSON.stringify(resp.err));
    store = resp.defaultState;
  } else {
    console.log(JSON.stringify(loggerInfo));
    store = resp;
  }

  return { props: { store } };
};

export default Price;
