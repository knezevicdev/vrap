import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React, { FC, useContext, useEffect, useState } from 'react';

import Chatbox from './components/Chatbox';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import { LinksMake, LinksModel, LinksType } from './components/Links';
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
    'LinksType',
    'LinksMake',
    'LinksModel',
    'WhoWeAre',
    'Chatbox',
  ];

  const expSectionOrder: string[] = [
    'Hero',
    'LinksType',
    'Highlights',
    'Values',
    'QuoteHIW',
    'Quotes',
    'LinksMake',
    'LinksModel',
    'WhoWeAre',
    'Chatbox',
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
    LinksType: LinksType,
    LinksMake: LinksMake,
    LinksModel: LinksModel,
    WhoWeAre: WhoWeAre,
    Chatbox: Chatbox,
  };

  useEffect(() => {
    const { experiments } = homeStore;

    const expId = 'delta-home-page-links-v2';
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
