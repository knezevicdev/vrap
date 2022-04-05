import { SkipNavigationLink } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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

  useEffect(() => {
    const storedId = localStorage.getItem('priceId');
    if (storedId && storedId !== priceId) {
      localStorage.removeItem('priceId');
    }
  }, []);

  return (
    <Page name="Price">
      {!appStore.store.absmart.isABSmartlyLoading && (
        <SkipNavigationLink mainContentId={'main-content'} />
      )}
      <Header />
      {!appStore.store.absmart.isABSmartlyLoading && (
        <Contents id="main-content">
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

interface Props {
  title: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  return {
    props: {
      title: 'Price | Vroom',
    },
  };
};

export default observer(Price);
