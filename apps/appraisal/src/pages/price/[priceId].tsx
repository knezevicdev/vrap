import { SimpleHeader } from '@vroom-web/header-components';
import { IncomingMessage } from 'http';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import Footer from 'src/core/Footer';
import ENVS from 'src/integrations/Envs';
import PriceInfo from 'src/modules/price';
import { PriceStore } from 'src/modules/price/store';
import Questions from 'src/modules/questions';
import Page from 'src/Page';

const Price: NextPage = () => {
  const gearboxPrivateUrl = ENVS.GEARBOX_PRIVATE_URL;
  const store = new PriceStore();
  //   const router = useRouter();
  //   const priceId = router.query.priceId as string;

  return (
    <Page name="Home">
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <PriceInfo store={store} />
      <Questions />
      <Footer />
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
  // automated price qa
  // http://localhost:3000/appraisal/price/e93bafe0b739241f875d1e3c35416fff

  // automated price dev
  // http://localhost:3000/appraisal/price/cd24f8a61d797c8ef910694f252277d8

  // no price
  // http://localhost:3000/appraisal/price/d9b61a51f993808577a102eecbe8df0d

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

export default Price;
