import React from 'react';
import styled from 'styled-components';

import InteriorConditionInput from './forminputs/InteriorConditionInput';
import SeatsInput from './forminputs/SeatsInput';
import SmokedInInput from './forminputs/SmokedInInput';

export interface Props {
  fields: any;
}

const InteriorCondition: React.FC<Props> = ({ fields }) => {
  return (
    <>
      <InteriorConditionInput field={fields.interiorCondition} />
      <InteriorDetails>
        <Seats field={fields.seats} />
        <SmokedIn field={fields.smokedIn} />
      </InteriorDetails>
    </>
  );
};

const InteriorDetails = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    display: block;
  }
`;

const Seats = styled(SeatsInput)`
  width: 49%;
  margin: 20px 0;
  @media (max-width: 767px) {
    width: 100%;
    margin: 20px 0 0;
  }
`;

const SmokedIn = styled(SmokedInInput)`
  width: 49%;
  margin: 20px 0;
  @media (max-width: 767px) {
    width: 100%;
    margin: 20px 0 0;
  }
`;

export default InteriorCondition;
