import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React, { FC, useContext, useEffect, useState } from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Links from './components/Links';
import QuoteHIW from './components/QuoteHIW';
import Quotes from './components/Quotes';
import Values from './components/Values';
import WhoWeAre from './components/WhoWeAre';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import experimentSDK from 'src/integrations/experimentSDK';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';

const { publicRuntimeConfig } = getConfig();

const Vroom: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  const homeStore = useContext<HomeStore>(HomeStoreContext);
  const [analyticsHandler] = useState<AnalyticsHandler>(new AnalyticsHandler());

  const defaultSectionOrder: string[] = [
    'Hero',
    'Highlights',
    'Values',
    'QuoteHIW',
    'Quotes',
    'Links',
    'WhoWeAre',
  ];

  const expSectionOrder: string[] = [
    'Hero',
    'Links',
    'Highlights',
    'Values',
    'QuoteHIW',
    'Quotes',
    'WhoWeAre',
  ];

  const [sectionOrder, setSectionOrder] = useState<string[]>(
    defaultSectionOrder
  );

  const componentMap: { [slug: string]: FC } = {
    Hero: Hero,
    Highlights: Highlights,
    Values: Values,
    QuoteHIW: QuoteHIW,
    Quotes: Quotes,
    Links: Links,
    WhoWeAre: WhoWeAre,
  };

  useEffect(() => {
    const { experiments } = homeStore;
    // detla lol
    const expId = 'detla-home-page-links';
    const variantCalculatedExp = experimentSDK.determineVariantClientSide(
      experiments,
      expId
    );
    if (variantCalculatedExp) {
      analyticsHandler.registerExperiment(variantCalculatedExp);
      if (variantCalculatedExp.assignedVariant === 1)
        setSectionOrder(expSectionOrder);
    }
  }, []);

  return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      {sectionOrder.map((sectionSlug, idx) => {
        const Component = componentMap[sectionSlug];
        if (Component) return <Component key={idx} />;
      })}
      <StandardFooter />
    </>
  );
};

export default Vroom;
