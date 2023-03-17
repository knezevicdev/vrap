import { observer } from 'mobx-react';
import React from 'react';

import { UseForm } from '../componentInterfaces.d';
import View from './View';

interface Props {
  fields: any;
  form: UseForm;
}

const ExteriorConditions: React.FC<Props> = ({ fields, form }) => {
  return <View fields={fields} form={form} />;
};

export default observer(ExteriorConditions);
