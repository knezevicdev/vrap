import { observer } from 'mobx-react';
import React from 'react';

import { UseForm } from '../componentInterfaces.d';
import View from './View';

interface Props {
  fields: any;
  newForm?: boolean;
  form: UseForm;
}

const ExteriorConditions: React.FC<Props> = ({ fields, newForm, form }) => {
  return <View fields={fields} newForm={newForm} form={form} />;
};

export default observer(ExteriorConditions);
