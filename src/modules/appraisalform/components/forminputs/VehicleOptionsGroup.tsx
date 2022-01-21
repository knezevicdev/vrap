import { Checkbox } from '@vroom-web/ui-lib';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import useForm from '../useForm';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
  options: any[];
}

const VehicleOptionsGroup: React.FC<Props> = ({
  field,
  options,
  className,
}) => {
  const [checkedValuesForParent, setCheckedValuesForParent] = useState(
    [] as string[]
  );
  const { onChange } = field;
  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt.name) || opt.selected;
    return {
      ...result,
      [opt.name]: { value: optChecked, isRequired: false },
    };
  }, {});

  const optionsGroupForm = useForm({ defaultValues: optionsDefaultVals });

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
      const handleOnClick = (option: GenericObject) => {
        option.onChange({ ...field, checked: !option.value });
      };

      return (
        <VehicleOption
          key={key}
          htmlFor={key + '-checkbox'}
          onClick={() => handleOptionClick(key, typedOption)}
        >
          <Checkbox
            name={key}
            id={key + '-checkbox'}
            label={key}
            onChange={handleOnClick}
            checked={!!typedOption.value}
            dataQa="vehicleoptioncheck"
          />
        </VehicleOption>
      );
    }
  );

  return (
    <div className={className}>
      <VehicleOptionsLabel>
        {FormFields.vehicleOptions.label}
      </VehicleOptionsLabel>
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
  padding: 0 0 10px;
`;

const VehicleOption = styled(({ ...restProps }) => <li {...restProps} />)`
  padding: 0 0 5px;
`;

export default VehicleOptionsGroup;
