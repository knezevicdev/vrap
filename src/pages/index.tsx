import _ from 'lodash';
import { observer } from 'mobx-react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { returnBrandConfig } from './utils/utils';

import { Header } from 'src/components/Header';
import { useAppStore } from 'src/context';
import Footer from 'src/core/Footer';
import AppraisalForm from 'src/modules/appraisalform';
import Page from 'src/Page';

const AppraisalFormPage: NextPage = () => {
  const router = useRouter();
  const vehicle = router.query.vehicle as string;
  const { store } = useAppStore();
  store.appraisal.setVehicleId(vehicle);

  return (
    <Page name="Appraisal Form">
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <PageContent>
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
    },
  };
};

export default observer(AppraisalFormPage);
