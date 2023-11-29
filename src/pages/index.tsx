import {
  SkipNavigationLink,
  SpinnerColor,
  SpinnerSize,
  ThemeProps,
  VroomSpinner,
} from '@vroom-web/ui-lib';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import useIsTradeIn from '../hooks/useIsTradeIn';
import useHandleAppraisalRoutes from '../modules/appraisal/hooks/useHandleAppraisalRoutes';
import TradeInError from '../modules/appraisalform/components/TradeInError';
import useAppraisalStore from '../store/appraisalStore';
import useDealStore from '../store/dealStore';
import { returnBrandConfig } from '../utils/pageheaders';

import Header from 'src/components/Header';
import Footer from 'src/core/Footer';
import AppraisalForm from 'src/modules/appraisalform';
import Page from 'src/Page';

const AppraisalFormPage: NextPage = () => {
  const router = useRouter();
  const vehicle = router.query.vehicle as string;
  const isLoading = useDealStore((state) => state.loading);
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
      {isLoading && (
        <WhiteBox>
          <SpinnerContainer>
            <VroomSpinner
              size={SpinnerSize.MD}
              color={SpinnerColor.PRIMARY_BRAND}
              showBrand={true}
              showLoadingText={false}
              loadingText="loading..."
            />
          </SpinnerContainer>
        </WhiteBox>
      )}
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

const WhiteBox = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
`;

export default AppraisalFormPage;
