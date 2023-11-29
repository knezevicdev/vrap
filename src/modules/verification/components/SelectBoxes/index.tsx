import { HorizontalRadio, HorizontalRadioOption } from '@vroom-web/ui-lib';
import React from 'react';
import { FieldValues, Path, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

interface Props<T extends FieldValues> {
  label: string;
  tooltip?: string;
  id: Path<T>;
  control: Control<T>;
  options: string[];
  onChange?: (value: string) => void;
}

const SelectBoxes = <T extends FieldValues>({
  label,
  tooltip,
  id,
  control,
  options,
  onChange,
}: Props<T>) => {
  const {
    field: { onChange: fieldOnChange, value },
  } = useController({
    name: id,
    control,
  });

  return (
    <HorizontalRadio
      id={id}
      options={mapOptions(options)}
      label={label}
      tooltip={tooltip ? { content: tooltip } : undefined}
      onChange={(value) => {
        fieldOnChange(value);
        onChange && onChange(value);
      }}
      value={value}
    />
  );
};

const mapOptions = (options: string[]): HorizontalRadioOption[] => {
  return options.map((option) => ({
    label: option,
    value: option,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'data-qa': option,
  }));
};

export default SelectBoxes;
