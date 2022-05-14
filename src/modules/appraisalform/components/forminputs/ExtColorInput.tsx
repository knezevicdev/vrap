import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import React from 'react';

import { FormField } from '../../../../interfaces.d';
import Dropdown from '../Dropdown';
import { FormFields } from './Inputs.language';

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
  const { onChange } = field;
  const analyticsHandler = new AnalyticsHandler();

  const handleOnChange = (changes: SelectChanges<SelectItem>) => {
    analyticsHandler.trackColorChange();
    const value = changes.selectedItem?.value;
    onChange({ ...field, value });
  };

  return (
    <Dropdown
      className={className}
      field={{
        ...field,
        defaultLabel: FormFields.extColor.placeholder,
        label: FormFields.extColor.label,
        options: customOptions,
        onChange: handleOnChange,
      }}
    />
  );
};

export default ExtColorInput;
