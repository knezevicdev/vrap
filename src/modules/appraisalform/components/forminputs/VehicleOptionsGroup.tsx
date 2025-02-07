import { Checkbox } from '@vroom-web/ui-lib';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import useForm from '../useForm';

interface Props {
  field: FormField;
  className?: string;
  options: { name: string; selected: boolean }[];
}

const VehicleOptionsGroup: React.FC<Props> = ({
  field,
  options,
  className,
}) => {
  const [checkedValuesForParent, setCheckedValuesForParent] = useState(() => {
    return options.reduce((result: string[], opt) => {
      const optChecked = field.value.includes(opt.name) || opt.selected;
      if (!optChecked) return result;

      return [...result, opt.name];
    }, []);
  });
  const { onChange } = field;
  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt.name) || opt.selected;
    return {
      ...result,
      [opt.name]: { value: optChecked, isRequired: false },
    };
  }, {});

  const optionsGroupForm = useForm({
    defaultValues: optionsDefaultVals,
    formKey: 'vehicleOptions',
  });

  useEffect(() => {
    optionsGroupForm.setFormFields(optionsDefaultVals);
  }, [options]);

  const handleOptionClick = (key: string, clickedCheckbox: GenericObject) => {
    clickedCheckbox.onChange({
      ...clickedCheckbox,
      value: !clickedCheckbox.value,
    });

    if (!clickedCheckbox.value && checkedValuesForParent.indexOf(key) === -1) {
      // if checkbox is checked and not yet in the checked array push it
      checkedValuesForParent.push(key);
    } else if (
      !clickedCheckbox.value === false &&
      checkedValuesForParent.indexOf(key) > -1
    ) {
      // if checkbox is not checked and already in the checked array remove it
      checkedValuesForParent.splice(checkedValuesForParent.indexOf(key), 1);
    }

    setCheckedValuesForParent([...checkedValuesForParent]);
    onChange({ ...field, value: checkedValuesForParent });
  };

  const checkboxes = Object.entries(optionsGroupForm.fields).map(
    ([key, option]) => {
      const typedOption: GenericObject = option as GenericObject;

      return (
        <VehicleOption key={key} htmlFor={key + '-checkbox'}>
          <Checkbox
            name={key}
            id={key + '-checkbox'}
            label={key}
            onChange={() => handleOptionClick(key, typedOption)}
            checked={!!typedOption.value}
            dataQa="vehicleoptioncheck"
          />
        </VehicleOption>
      );
    }
  );

  return (
    <div className={className}>
      <VehicleOptionsLabel>Options (select all that apply)</VehicleOptionsLabel>
      <CheckboxesContainer>{checkboxes}</CheckboxesContainer>
    </div>
  );
};

const CheckboxesContainer = styled.ul`
  list-style: none;
  column-count: 2;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const VehicleOptionsLabel = styled.div`
  padding: 0 0 8px;
`;

const VehicleOption = styled(({ ...restProps }) => <li {...restProps} />)`
  padding: 0 0 8px;
`;

export default VehicleOptionsGroup;
