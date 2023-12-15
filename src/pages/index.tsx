import { SkipNavigationLink, ThemeProps } from '@vroom-web/ui-lib';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import useIsTradeIn from '../hooks/useIsTradeIn';
import useHandleAppraisalRoutes from '../modules/appraisal/hooks/useHandleAppraisalRoutes';
import DealLoader from '../modules/appraisalform/components/DealLoader';
import TradeInError from '../modules/appraisalform/components/TradeInError';
import useVehicleIdFromRoute from '../modules/appraisalform/hooks/useVehicleIdFromRoute';
import useAppraisalStore from '../store/appraisalStore';
import { returnBrandConfig } from '../utils/pageheaders';

import Header from 'src/components/Header';
import Footer from 'src/core/Footer';
import AppraisalForm from 'src/modules/appraisalform';
import Page from 'src/Page';

const AppraisalFormPage: NextPage = () => {
  const vehicle = useVehicleIdFromRoute();
  const isTradeIn = useIsTradeIn();

  useHandleAppraisalRoutes();

  const title = useMemo(
    () => (isTradeIn ? 'Checkout Appraisal Form' : 'Appraisal Form'),
    [isTradeIn]
  );

  useEffect(() => {
    useAppraisalStore.getState().setVehicleId(vehicle);
  }, [vehicle]);

  return (
    <Page name={title}>
      <DealLoader />
      <SkipNavigationLink mainContentId={'main-content'} />
      <HeaderContainer>
        <Header />
        <TradeInError />
      </HeaderContainer>
      <PageContent id="main-content">
        <AppraisalForm />
      </PageContent>
      <Footer />
    </Page>
  );
};

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 5;
`;

const PageContent = styled.div`
  height: 100%;
  background-color: #f5f5f5;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: ${(props: { theme: ThemeProps }): string =>
    props.theme.typography.family.body};
`;

interface Props {
  title: string;
  canonical: string;
  description: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brandConfig = returnBrandConfig();

  const hasUserSignedInBefore = !!ctx.req.cookies['ajs_user_id'];

  const isTradeIn = ctx.req.url?.includes('/tradeIn-selfService');
  const isInStore = Object.keys(ctx.query).includes('in-store');

  const isAuthRequired = isTradeIn || (hasUserSignedInBefore && !isInStore);

  return {
    props: {
      description: brandConfig.description,
      title: brandConfig.title,
      canonical: brandConfig.canonical,
      allowUnauthenticated: !isAuthRequired,
      forcedSignInDueToPreviousAuth: isAuthRequired && hasUserSignedInBefore,
    },
  };
};

export default AppraisalFormPage;
