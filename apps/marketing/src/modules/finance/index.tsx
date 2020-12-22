import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import ContactModule from '../locations/components/ContactModule';
import Hero from './components/Hero';
import { Divider } from '@material-ui/core';
import Quotes from './components/Quotes';
import Values from './components/Values';
import Partners from './components/Partners';
import FinancialSteps from './components/FinancialSteps';

const { publicRuntimeConfig } = getConfig();

const HowItWorks: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <Hero />
      <Quotes />
      <Values />
      <Divider />
      <Partners />
      <FinancialSteps />
      <ContactModule />
      <StandardFooter />
    </>
  );
};

export default HowItWorks;
