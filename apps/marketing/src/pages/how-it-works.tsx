import { ThemeProvider } from '@vroom-web/ui';
import { Brand } from '@vroom-web/whitelabel';
import React from 'react';

import Page from 'src/Page';
import HowItWorks from 'src/modules/how-it-works';

const HowItWorksPage = () => {
  const head = (
    <>
      <title>Vroom - How Vroom Works</title>
    </>
  );

  const brand = Brand.VROOM;

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="How it Works" head={head}>
        <HowItWorks />
      </Page>
    </ThemeProvider>
  );
};

export default HowItWorksPage;
