import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import HasAccidentInput from './forminputs/HasAccidentInput';
import StateInput from './forminputs/StateInput';
import TitleStatusInput from './forminputs/TitleStatusInput';

const VehicleHistory = ({ fields, isTradeInState }) => {
  const [isTradeIn, setIsTradeIn] = useState(false);

  useEffect(() => {
    const tradeIn = window.location.pathname.includes('tradeIn-selfService');
    setIsTradeIn(tradeIn);
  }, []);

  return (
    <>
      <HasAccident field={fields.hasAccident} />
      {isTradeIn && isTradeInState && (
        <State field={fields.whichStatePurchase} />
      )}
      <TitleStatusInput field={fields.titleStatus} />
    </>
  );
};

const HasAccident = styled(HasAccidentInput)`
  width: 50%;
  margin: 20px 0;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const State = styled(StateInput)`
  width: 50%;
  margin-bottom: 32px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export default VehicleHistory;
