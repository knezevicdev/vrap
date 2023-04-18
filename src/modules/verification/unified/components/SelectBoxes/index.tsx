import { HorizontalRadio, HorizontalRadioOption } from '@vroom-web/ui-lib';
import React from 'react';
import { FieldValues, Path, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

import { Container, Label, LabelContainer } from './Style.css';

interface Props<T extends FieldValues> {
  label: string;
  id: Path<T>;
  control: Control<T>;
  className?: string;
  options: string[];
  onChange?: (value: string) => void;
}

const SelectBoxes = <T extends FieldValues>({
  label,
  id,
  control,
  className,
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
    <Container className={className}>
      {label && (
        <LabelContainer>
          <Label>{label}</Label>
        </LabelContainer>
      )}
      <HorizontalRadio
        id={id}
        options={mapOptions(options)}
        onChange={(value) => {
          fieldOnChange(value);
          onChange && onChange(value);
        }}
        value={value}
      />
    </Container>
  );
};

const mapOptions = (options: string[]): HorizontalRadioOption[] => {
  return options.map((option) => ({
    label: option,
    value: option,
    'data-qa': option,
  }));
};

export default SelectBoxes;
