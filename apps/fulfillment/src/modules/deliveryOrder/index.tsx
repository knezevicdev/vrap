import React from 'react';

import Information from './components/Information';
import Status from './components/Status';

import Header from 'src/components/Header';

const DeliveryOrder: React.FC = () => {
  return (
    <>
      <Header />
      <Status />
      <Information />
    </>
  );
};

export default DeliveryOrder;
