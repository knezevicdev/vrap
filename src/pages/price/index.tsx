import { SkipNavigationLink } from '@vroom-web/ui-lib';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import useIsAbSmartlyLoading from '../../hooks/useIsAbSmartlyLoading';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import usePriceStore from '../../modules/price/store';

import AsyncIndicator from 'src/components/AsyncIndicator';
import Header from 'src/components/Header';
import ProgressiveAd from 'src/components/ProgressiveAd';
import Questions from 'src/components/Questions';
import Footer from 'src/core/Footer';
import PriceInfo from 'src/modules/price';
import Page from 'src/Page';

const Price: NextPage = () => {
  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);
  const router = useRouter();
  const priceId = router.query.priceId as string;
  const isAbSmartlyLoading = useIsAbSmartlyLoading();

  const { grade, vin, userEmail } = usePriceStore(
    (state) => ({
      grade: state.price.grade,
      vin: state.price.vin,
      userEmail: state.price.userEmail,
    }),
    shallow
  );

  useEffect(() => {
    const storedId = localStorage.getItem('priceId');
    if (storedId && storedId !== priceId) {
      localStorage.removeItem('priceId');
    }
    usePriceStore.getState().getOfferDetails(priceId);
  }, [priceId]);

  const asyncStatus = usePriceStore((state) => state.asyncStatus);

  useEffect(() => {
    if (!grade) return;

    if (grade.toLowerCase() === 'retail') {
      analyticsHandler.trackRetailAppraisalOffer(vin, userEmail);
    }

    if (grade.toLowerCase() === 'wholesale') {
      analyticsHandler.trackWholesaleAppraisalOffer(vin, userEmail);
    }
  }, [grade, vin, userEmail, analyticsHandler]);

  return (
    <Page name="Price">
      {!isAbSmartlyLoading && (
        <SkipNavigationLink mainContentId={'main-content'} />
      )}
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      {!isAbSmartlyLoading && (
        <Contents id="main-content">
          <PriceInfo />
          <ProgressiveAd />
          <Questions />
        </Contents>
      )}
      <Footer />
      <AsyncIndicator status={asyncStatus} />
    </Page>
  );
};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 5;
`;

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
      allowUnauthenticated: true,
    },
  };
};

export default Price;
