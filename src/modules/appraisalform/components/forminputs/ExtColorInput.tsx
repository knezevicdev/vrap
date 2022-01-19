import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
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

  const handleOnChange = (event: GenericObject) => {
    analyticsHandler.trackColorChange();
    const value = event.target.value;
    const error = value === 'Exterior Color';
    onChange({ ...field, value, error });
  };

  return (
    <Dropdown
      className={className}
      field={{
        ...field,
        defaultLabel: FormFields.extColor.placeholder,
        label: FormFields.extColor.label,
        customOptions,
        onChange: handleOnChange,
      }}
    />
  );
};

export default ExtColorInput;
