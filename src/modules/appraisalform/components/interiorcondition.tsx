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
        <HorizontalRadioContainer>
          <SeatsInput field={fields.seats} />
        </HorizontalRadioContainer>
        <HorizontalRadioContainer>
          <SmokedInInput field={fields.smokedIn} />
        </HorizontalRadioContainer>
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

const HorizontalRadioContainer = styled.div`
  width: 49%;
  margin: 20px 0;
  @media (max-width: 767px) {
    width: 100%;
    margin: 20px 0 0;
  }
`;

export default InteriorCondition;
