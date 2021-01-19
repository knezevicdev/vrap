import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import ContactModule from '../locations/components/ContactModule';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import StyledHowItWorks from './components/StyledHowItWorks';
import Values from './components/Values';

const { publicRuntimeConfig } = getConfig();

const Reviews: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <Hero />
      <Highlights />
      <StyledHowItWorks />
      <Values />
      <ContactModule />
      <StandardFooter />
    </>
  );
};

export default Reviews;
