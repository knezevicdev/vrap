import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';
import useForm from '@app/components/Form/useForm';
import Checkbox from '@app/components/Checkbox';
import { globalConfig } from '@app/lib/globalConfig';
import OtherOptionInput from '@app/components/Form/Inputs/AppraisalFormInput/OtherOptionInput';

const { STATIC_URL } = globalConfig;

const WarningLightsOptionsGroup = ({ field, className, otherWarningField }) => {
  const [checkedValuesForParent, setCheckedValuesForParent] = useState([]);
  const { onChange } = field;

  const options = [
    {
      value: FormFields.warningLightOptions.abs,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/abs-icon.png`
    },
    {
      value: FormFields.warningLightOptions.airbag,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/air-bag-icon.png`
    },
    {
      value: FormFields.warningLightOptions.checkEngine,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/check-engine-icon.png`
    },
    {
      value: FormFields.warningLightOptions.transmission,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/transmission-icon.png`
    },
    {
      value: FormFields.warningLightOptions.airConditioner,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/air-conditioner-icon.png`
    },
    {
      value: FormFields.warningLightOptions.fluid,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/fluid-icon.png`
    },
    {
      value: FormFields.warningLightOptions.serviceEngine,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/service-engine-icon.png`
    },
    {
      value: FormFields.warningLightOptions.lowCoolant,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/low-coolant-icon.png`
    },
    {
      value: FormFields.warningLightOptions.other
    }
  ];

  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt.value);
    return {
      ...result,
      [opt.value]: { value: optChecked, isRequired: false, imgSrc: opt.imgSrc }
    };
  }, {});

  const optionsGroupForm = useForm({ defaultValues: optionsDefaultVals });

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
        <WarningOption
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
              label: key,
              imgSrc: option.imgSrc
            }}
          />
        </WarningOption>
      );
    }
  );

  return (
    <div className={className}>
      <WarningOptionsLabel>
        {FormFields.warningLightOptions.label}
      </WarningOptionsLabel>
      <CheckboxesContainer>{checkboxes}</CheckboxesContainer>
      {optionsGroupForm.fields.Other.value && (
        <OtherOptionInput field={otherWarningField} />
      )}
    </div>
  );
};

const CheckboxesContainer = styled.ul`
  list-style: none;
  width: 100%;
`;

const WarningOptionsLabel = styled.div`
  padding: 0 0 10px;
`;

const WarningOption = styled.li`
  padding: 0 0 10px;
`;

WarningLightsOptionsGroup.propTypes = {
  field: PropTypes.object,
  otherWarningField: PropTypes.object,
  className: PropTypes.string
};

export default WarningLightsOptionsGroup;
