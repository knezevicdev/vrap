import React from 'react';

import HasAccidentInput from './forminputs/HasAccidentInput';
import TitleStatusInput from './forminputs/TitleStatusInput';

export interface Props {
  fields: any;
}

const VehicleHistory: React.FC<Props> = ({ fields }) => {
  return (
    <>
      <HasAccidentInput field={fields.hasAccident} />
      <TitleStatusInput field={fields.titleStatus} />
    </>
  );
};

export default VehicleHistory;
