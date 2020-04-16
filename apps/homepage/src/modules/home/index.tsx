import React from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';

import Footer from 'src/components/footer/Footer';
import SimpleHeader from 'src/components/header/SimpleHeader';
import HowItWorks from 'src/components/HowItWorks';

// TODO: running into this issue
// https://github.com/mui-org/material-ui/issues/15832
// https://github.com/mui-org/material-ui/issues/16862
import Banner from '@vroom-web/banner';

const Home: React.FC = () => {
  return (
    <>
      <SimpleHeader />
      <Hero />
      <Banner text="Noice" />
      <Highlights />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Home;
