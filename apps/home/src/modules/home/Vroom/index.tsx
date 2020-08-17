import { StandardFooter } from '@vroom-web/footer-components';
import { InProgressDealBar, SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';
import JuneteenthBanner from './components/JuneteenthBanner';
import QuoteHIW from './components/QuoteHIW';
import Quotes from './components/Quotes';
import Values from './components/Values';
import WhoWeAre from './components/WhoWeAre';

const { publicRuntimeConfig } = getConfig();

const Vroom: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <>
      <SimpleHeader />
      {gearboxPrivateUrl && (
        <InProgressDealBar gearboxPrivateUrl={gearboxPrivateUrl} />
      )}
      <JuneteenthBanner />
      <Hero />
      <Highlights />
      <Values />
      <QuoteHIW />
      <Quotes />
      <WhoWeAre />
      <StandardFooter />
    </>
  );
};

export default Vroom;
