import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import React from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';

const Home: React.FC = () => {
  return (
    <>
      <SimpleHeader />
      <Hero />
      <Highlights />
      <StandardFooter />
    </>
  );
};

export default Home;
