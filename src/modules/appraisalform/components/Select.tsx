import { Select as VroomSelect } from '@vroom-web/ui-lib';
import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import { isEmpty } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { FormField } from './componentInterfaces.d';

interface SelectField extends Omit<FormField, 'onChange' | 'options'> {
  onChange: (change: SelectChanges<SelectItem>) => void;
  options: SelectItem[];
  id?: string;
}

interface SelectProps {
  field: SelectField;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  field: {
    label,
    value,
    error = false,
    errorMessage = `please select a ${label}`,
    onChange,
    id,
    disabled,
    defaultLabel,
    options,
  },
  className,
}) => {
  return (
    <BaseSelect
      id={id || ''}
      className={className}
      label={label}
      placeholder={defaultLabel}
      success={!error && !isEmpty(value)}
      error={error ? errorMessage : undefined}
      selectedItem={selectedOption(value, options)}
      items={options}
      disabled={disabled}
      onSelectedItemChange={onChange}
    />
  );
};

const selectedOption = (
  value: string,
  options: SelectItem[]
): SelectItem | null => {
  return options.find((t: SelectItem) => t.value === value) || null;
};

export default Select;

const BaseSelect = styled(VroomSelect)`
  margin-bottom: 10px;
  button span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ success, error }) => (success || error) && `padding-right: 20px`};
  }

  svg {
    right: 32px;
  }

  label {
    line-height: 13px;
    font-size: 13px;

    span {
      line-height: 13px;
      font-size: 13px;
    }
  }
`;
