import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import CustomerReviews from './components/CustomerReviews';
import Hero from './components/Hero';
import InventoryCTA from './components/InventoryCTA';
import Process from './components/Process';

const { publicRuntimeConfig } = getConfig();

const HowItWorks: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <Hero />
      <Process />
      <InventoryCTA />
      <CustomerReviews />
      <StandardFooter />
    </>
  );
};

export default HowItWorks;
