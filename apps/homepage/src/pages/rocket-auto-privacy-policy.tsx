import { NextPage } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import PrivacyPolicy from 'src/modules/privacy-policy';

interface PrivacyPolicyPageProps {
  title: string;
}

const PrivacyPolicyPage: NextPage<PrivacyPolicyPageProps> = ({ title }) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
  return (
    <Page name="Rocket Auto Privacy Policy" head={head}>
      <PrivacyPolicy />
    </Page>
  );
};

PrivacyPolicyPage.getInitialProps = async (): Promise<
  PrivacyPolicyPageProps
> => {
  const title = 'Privacy Policy - Rocket Auto';
  return { title };
};

export default PrivacyPolicyPage;
