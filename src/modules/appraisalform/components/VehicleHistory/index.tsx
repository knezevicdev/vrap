import { observer } from 'mobx-react';
import React from 'react';

import { FormField } from '../../../../interfaces.d';
import View from './View';

interface Props {
  fields: Record<string, FormField>;
}

const VehicleHistory: React.FC<Props> = ({ fields }) => {
  return <View fields={fields} />;
};

export default observer(VehicleHistory);
