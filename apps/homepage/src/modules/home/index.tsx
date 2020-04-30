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
    </>
  );
};

export default Home;
