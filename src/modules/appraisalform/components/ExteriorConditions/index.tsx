import { observer } from 'mobx-react';
import React from 'react';

import View from './View';

interface Props {
  fields: any;
}

const ExteriorConditions: React.FC<Props> = ({ fields }) => {
  return <View fields={fields} />;
};

export default observer(ExteriorConditions);
