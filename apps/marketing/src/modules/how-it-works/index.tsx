import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

const { publicRuntimeConfig } = getConfig();

const HowItWorks: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      {/* <Process />
      <InventoryCta />
      <CustomerReviews /> */}
      <StandardFooter />
    </>
  );
};

export default HowItWorks;
