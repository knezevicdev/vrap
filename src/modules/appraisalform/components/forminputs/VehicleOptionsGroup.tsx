import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';
import useForm from '@app/components/Form/useForm';
import Checkbox from '@app/components/Checkbox';

const VehicleOptionsGroup = ({ field, options, className }) => {
  const [checkedValuesForParent, setCheckedValuesForParent] = useState([]);
  const { onChange } = field;
  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt);
    return {
      ...result,
      [opt]: { value: optChecked, isRequired: false }
    };
  }, {});

  const optionsGroupForm = useForm({ defaultValues: optionsDefaultVals });

  useEffect(
    () => {
      optionsGroupForm.setFormFields(optionsDefaultVals);
    },
    [options]
  );

  const handleOptionClick = (key, clickedCheckbox) => {
    clickedCheckbox.onChange({
      ...clickedCheckbox,
      value: !clickedCheckbox.value
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
      return (
        <VehicleOption
          key={key}
          htmlFor={key + '-checkbox'}
          onClick={() => handleOptionClick(key, option)}
        >
          <Checkbox
            name={key}
            id={key + '-checkbox'}
            field={{
              ...option,
              checked: !!option.value,
              label: key
            }}
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
`;

const VehicleOptionsLabel = styled.div`
  padding: 0 0 10px;
`;

const VehicleOption = styled.li`
  padding: 0 0 10px;
`;

VehicleOptionsGroup.propTypes = {
  field: PropTypes.object,
  options: PropTypes.array,
  className: PropTypes.string
};

export default VehicleOptionsGroup;
