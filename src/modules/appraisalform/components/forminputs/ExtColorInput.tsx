import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import React from 'react';

import { useAppStore } from '../../../../context';
import { FormField } from '../../../../interfaces.d';
import Select from '../Select';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Props {
  field: FormField;
  className?: string;
  customOptions: any[];
}

const ExtColorInput: React.FC<Props> = ({
  field,
  className,
  customOptions,
}) => {
  const { store } = useAppStore();
  const { onChange } = field;
  const analyticsHandler = new AnalyticsHandler();

  const handleOnChange = (changes: SelectChanges<SelectItem>) => {
    analyticsHandler.trackColorChange(store.appraisal.eventCategory);
    const value = changes.selectedItem?.value;
    onChange({ ...field, value });
  };

  return (
    <Select
      className={className}
      field={{
        ...field,
        defaultLabel: 'Exterior Color',
        label: 'Exterior Color (outside of the car)',
        options: customOptions,
        onChange: handleOnChange,
      }}
    />
  );
};

export default ExtColorInput;
