import React from 'react';
import styled from 'styled-components';

import HasAccidentInput from './forminputs/HasAccidentInput';
import TitleStatusInput from './forminputs/TitleStatusInput';

export interface Props {
  fields: any;
}

const VehicleHistory: React.FC<Props> = ({ fields }) => {
  return (
    <>
      <HasAccident field={fields.hasAccident} />
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

export default VehicleHistory;
