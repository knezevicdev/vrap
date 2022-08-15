import { observer } from 'mobx-react';
import React from 'react';

import { FormField } from '../../../../interfaces.d';
import { UseForm } from '../componentInterfaces.d';
import View from './View';

interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
}

const VehicleHistory: React.FC<Props> = ({ fields, form }) => {
  return <View fields={fields} form={form} />;
};

export default observer(VehicleHistory);
