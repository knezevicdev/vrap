import { SkipNavigationLink, VroomSpinner } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import ErrorBanner from '../components/ErrorBanner';
import useHandleAppraisalRoutes from '../modules/appraisal/hooks/useHandleAppraisalRoutes';
import { returnBrandConfig } from '../utils/pageheaders';

import { Header } from 'src/components/Header';
import { useAppStore } from 'src/context';
import Footer from 'src/core/Footer';
import AppraisalForm from 'src/modules/appraisalform';
import Page from 'src/Page';

const AppraisalFormPage: NextPage = () => {
  const router = useRouter();
  const vehicle = router.query.vehicle as string;
  const { store } = useAppStore();
  const isLoading = store.deal.loading;

  useHandleAppraisalRoutes();

  const title = useMemo(
    () =>
      store.appraisal.isTradeIn ? 'Checkout Appraisal Form' : 'Appraisal Form',
    [store.appraisal.isTradeIn]
  );

  const { tradeInError } = store.deal;

  useEffect(() => {
    store.appraisal.setVehicleId(vehicle);
  }, [store.appraisal, vehicle]);

  return (
    <Page name={title}>
      {isLoading && (
        <WhiteBox>
          <SpinnerContainer>
            <VroomSpinner />
          </SpinnerContainer>
        </WhiteBox>
      )}
      <SkipNavigationLink mainContentId={'main-content'} />
      <HeaderContainer>
        <Header />
        {tradeInError && <ErrorBanner errorMessage={tradeInError} />}
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
  font-family: ${(props): string => props.theme.typography.family.body};
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

  return {
    props: {
      description: brandConfig.description,
      title: brandConfig.title,
      canonical: brandConfig.canonical,
      allowUnauthenticated: true,
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

export default observer(AppraisalFormPage);
