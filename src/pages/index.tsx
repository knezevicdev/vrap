import { Brand } from '@vroom-web/ui';
import { IncomingMessage } from 'http';
import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { Header } from 'src/components/Header';
import { useAppStore } from 'src/context';
import Footer from 'src/core/Footer';
import AppraisalForm from 'src/modules/appraisalform';
import Page from 'src/Page';

interface Props {
  brand: Brand;
}

const AppraisalFormPage: NextPage = () => {
  const router = useRouter();
  const vehicle = router.query.vehicle as string;
  const { store } = useAppStore();
  store.appraisal.setVehicleId(vehicle);

  return (
    <Page name="Appraisal Form">
      <Header />
      <PageContent>
        <AppraisalForm />
      </PageContent>
      <Footer />
    </Page>
  );
};

const PageContent = styled.div`
  height: 100%;
  background-color: #f5f5f5;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
    return { uuid: '', ajs_anonymous_id: '' };
  }
};

AppraisalFormPage.getInitialProps = async (
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

export default observer(AppraisalFormPage);
