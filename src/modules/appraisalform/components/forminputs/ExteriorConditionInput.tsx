import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import RadioInput from '../RadioInput';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const ExteriorConditionInput: React.FC<Props> = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <ExteriorConditionInputWrapper>
      <RadioInput
        className={className}
        field={{
          ...field,
          options: [
            {
              label: FormFields.extCondition.aboveAverage.label,
              description: FormFields.extCondition.aboveAverage.description,
            },
            {
              label: FormFields.extCondition.average.label,
              description: FormFields.extCondition.average.description,
            },
            {
              label: FormFields.extCondition.belowAverage.label,
              description: FormFields.extCondition.belowAverage.description,
            },
          ],
          name: FormFields.extCondition.name,
          label: FormFields.extCondition.label,
          onClick: handleOnChange,
          checked: field.value,
        }}
      />
    </ExteriorConditionInputWrapper>
  );
};

const ExteriorConditionInputWrapper = styled.div`
  margin-top: 20px;
`;

export default ExteriorConditionInput;
