import React from 'react';
import RadioInput from '@app/components/RadioInput';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const TitleStatusInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <RadioInput
      className={className}
      field={{
        ...field,
        options: [
          {
            label: FormFields.titleStatus.clean.label,
            description: FormFields.titleStatus.clean.description
          },
          {
            label: FormFields.titleStatus.lemon.label,
            description: FormFields.titleStatus.lemon.description
          },
          {
            label: FormFields.titleStatus.salvage.label,
            description: FormFields.titleStatus.salvage.description
          },
          {
            label: FormFields.titleStatus.unknown.label,
            description: FormFields.titleStatus.unknown.description
          }
        ],
        name: FormFields.titleStatus.name,
        label: FormFields.titleStatus.label,
        onClick: handleOnChange,
        selected: field.value,
        tooltipText: FormFields.titleStatus.toolTip
      }}
    />
  );
};

TitleStatusInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default TitleStatusInput;
