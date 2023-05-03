import React from 'react';

import { FormField } from '../../../../interfaces.d';
import RadioInput from '../RadioInput';

interface Props {
  field: FormField;
  className?: string;
}

const TitleStatusInput: React.FC<Props> = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <RadioInput
      className={className}
      field={{
        ...field,
        options: [
          {
            label: 'Clean',
            description:
              'No history of salvage or automaker defects listed on the title,  may or may not have money borrowed on the vehicle.',
          },
          {
            label: 'Lemon',
            description:
              'The vehicle has been previously acquired by the manufacturer  due to a warranty defect that impaired use or safety.',
          },
          {
            label: 'Rebuilt Salvage',
            description:
              'Vehicle is a salvage vehicle but has now been repaired and restored to operation.',
          },
          {
            label: 'True Miles Unknown',
            description: 'Vehicle has an odometer reading that is inaccurate.',
          },
        ],
        name: 'TitleStatus',
        label: 'What type of title does the vehicle have?',
        onClick: handleOnChange,
        checked: field.value,
        tooltipText:
          'Title brands indicate whether a used vehicle has sustained damage or might be potentially unsafe to drive. If a vehicle\'s title has been "branded," it is an official designation made by a state agency and should appear on the vehicle\'s title paperwork.',
      }}
    />
  );
};

export default TitleStatusInput;
