import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React, { useContext, useEffect, useState } from 'react';

import Hero from './components/Hero';
import HeroVideo from './components/HeroVideo';
import Highlights from './components/Highlights';
import JuneteenthBanner from './components/JuneteenthBanner';
import QuoteHIW from './components/QuoteHIW';
import Quotes from './components/Quotes';
import Values from './components/Values';
import WhoWeAre from './components/WhoWeAre';

import experimentSDK from 'src/integrations/experimentSDK';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';

const { publicRuntimeConfig } = getConfig();

const Vroom: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  const homeStore = useContext<HomeStore>(HomeStoreContext);
  const [showHeroVideo, setShowHeroVideo] = useState<boolean>(false);
  const [analyticsHandler] = useState<AnalyticsHandler>(new AnalyticsHandler());

  useEffect(() => {
    const { experiments } = homeStore;
    const expId = 'delta-video-hero';
    const variantCalculatedExp = experimentSDK.determineVariantClientSide(
      experiments,
      expId
    );
    if (variantCalculatedExp) {
      analyticsHandler.registerExperiment(variantCalculatedExp);
      if (variantCalculatedExp.assignedVariant === 1) setShowHeroVideo(true);
    }
  }, []);

  return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <JuneteenthBanner />
      {showHeroVideo ? <HeroVideo /> : <Hero />}
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
