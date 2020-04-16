import React from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';

import Footer from 'src/components/footer/Footer';
import SimpleHeader from 'src/components/header/SimpleHeader';
import HowItWorks from 'src/components/HowItWorks';

// TODO: running into this issue
// https://github.com/mui-org/material-ui/issues/15832
// https://github.com/mui-org/material-ui/issues/16862
// import Banner from '@vroom-web/banner';

import Button from '@material-ui/core/Button';
import { ConfirmProvider } from '@vroom-web/material-ui-confirm';
import { useConfirm } from '@vroom-web/material-ui-confirm';
// import { ConfirmProvider } from 'material-ui-confirm';
// import { useConfirm } from 'material-ui-confirm';

const Item = () => {
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({ description: 'This action is permanent!' }).then(() => {
      console.log('hello confirm');
    });
  };

  return <Button onClick={handleClick}>Click</Button>;
};

const Home: React.FC = () => {
  return (
    <>
      <ConfirmProvider>
        <SimpleHeader />
        <Hero />
        <Item />
        {/* <Banner text="Noice" /> */}
        <Highlights />
        <HowItWorks />
        <Footer />
      </ConfirmProvider>
    </>
  );
};

export default Home;
