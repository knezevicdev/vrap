import { IncomingMessage } from 'http';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import Header from 'src/components/Header';
import Footer from 'src/core/Footer';
import Congratulations from 'src/modules/congratulations';
import Questions from 'src/modules/questions';
import Page from 'src/Page';

const CongratulationPage: NextPage = () => {
  return (
    <Page name="Congrats! Document submitted">
      <Header />
      <Contents>
        <Congratulations />
        <Questions />
      </Contents>
      <Footer />
    </Page>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
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
  const { req } = context;
  const cookies = parseCookies(req);

  const loggerInfo = {
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

export default CongratulationPage;
