import React from 'react';
import styled from 'styled-components';

import InteriorConditionInput from './forminputs/InteriorConditionInput';
import SeatsInput from './forminputs/SeatsInput';
import SmokedInInput from './forminputs/SmokedInInput';

const InteriorCondition = ({ fields }) => {
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

  ${(props) => props.theme.media.mobile} {
    display: block;
  }
`;

const Seats = styled(SeatsInput)`
  width: 49%;
  margin: 20px 0;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
    margin: 20px 0 0;
  }
`;

const SmokedIn = styled(SmokedInInput)`
  width: 49%;
  margin: 20px 0;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
    margin: 20px 0 0;
  }
`;

export default InteriorCondition;
