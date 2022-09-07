import React from 'react';

import { useAppStore } from '../../../../context';
import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Props {
  field: FormField;
  className?: string;
}

const NumberOfKeysInput: React.FC<Props> = ({ field }) => {
  const { store } = useAppStore();
  const { onChange, value } = field;
  const analyticsHandler = new AnalyticsHandler();

  const handleOnChange = (value: string) => {
    analyticsHandler.trackNumberOfKeysChange(store.appraisal.eventCategory);
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      field={{
        ...field,
        options: ['1', '2+'],
        label: FormFields.howManyKeys.label,
        onClick: handleOnChange,
        value,
      }}
    />
  );
};

export default NumberOfKeysInput;
