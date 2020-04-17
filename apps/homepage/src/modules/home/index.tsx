import React from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';

import Footer from 'src/components/footer/Footer';
import SimpleHeader from 'src/components/header/SimpleHeader';
import HowItWorks from 'src/components/HowItWorks';

const Home: React.FC = () => {
  return (
    <>
      <SimpleHeader />
      <Hero />
      <Highlights />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Home;
