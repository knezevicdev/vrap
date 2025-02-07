import { Checkbox } from '@vroom-web/ui-lib';
import { omit } from 'lodash';
import React, { useState } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import useForm from '../useForm';
import OtherOptionInput from './OtherOptionInput';

interface Props {
  field: FormField;
  className?: string;
  otherWarningField: FormField;
}

const STATIC_URL = 'https://www.vroom.com/static-assets/classic';

const WarningLightsOptionsGroup: React.FC<Props> = ({
  field,
  className,
  otherWarningField,
}) => {
  const [checkedValuesForParent, setCheckedValuesForParent] = useState(
    [] as string[]
  );
  const { onChange } = field;

  const options = [
    {
      value: 'ABS/Anti-Lock Brakes',
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/abs-icon.png`,
    },
    {
      value: 'Air Bag',
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/air-bag-icon.png`,
    },
    {
      value: 'Check Engine',
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/check-engine-icon.png`,
    },
    {
      value: 'Transmission',
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/transmission-icon.png`,
    },
    {
      value: 'Air Conditioner',
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/air-conditioner-icon.png`,
    },
    {
      value: 'Fluid',
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/fluid-icon.png`,
    },
    {
      value: 'Service Engine',
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/service-engine-icon.png`,
    },
    {
      value: 'Low Coolant',
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/low-coolant-icon.png`,
    },
    {
      value: 'Other',
    },
  ];

  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt.value);
    return {
      ...result,
      [opt.value]: { value: optChecked, isRequired: false, imgSrc: opt.imgSrc },
    };
  }, {});

  const optionsGroupForm = useForm({
    defaultValues: optionsDefaultVals,
    formKey: 'warningLights',
  });

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
        <WarningOption
          key={key}
          htmlFor={key + '-warning-lights-checkbox'}
          checked={!!typedOption.value}
        >
          <Checkbox
            name={key}
            id={key + '-warning-lights-checkbox'}
            onChange={() => handleOptionClick(key, typedOption)}
            checked={!!typedOption.value}
            dataQa="warninglightsoptioncheck"
          >
            <>
              {typedOption.imgSrc && (
                <ImgContainer alt={key} src={typedOption.imgSrc} />
              )}
              <Label>{key}</Label>
            </>
          </Checkbox>
        </WarningOption>
      );
    }
  );

  return (
    <div className={className}>
      <WarningOptionsLabel>Select active warning lights:</WarningOptionsLabel>
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
  margin: 0;
  padding: 0;
`;

const ImgContainer = styled.img`
  height: 15px;
  width: 22px;
  margin-top: 2px;
  margin-right: 3px;
  margin-left: 5px;
  object-fit: contain;
  object-position: center;
`;

const Label = styled.span`
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.3px;
  margin-left: 5px;
`;

const WarningOptionsLabel = styled.div`
  padding: 0 0 8px;
  color: #737373;
`;

interface WarningOptionProps {
  checked?: boolean;
}

const WarningOption = styled((props) => (
  <li {...omit(props, ['checked'])} />
))<WarningOptionProps>`
  padding: 1px 0 9px;
  display: flex;

  label::before {
    background-color: ${({ checked }) => (checked ? '#E71321' : '#f5f5f5')};
    border-color: #979797;
    border-radius: 4px;
    min-width: 22px;
    min-height: 22px;
    max-width: 22px;
    max-height: 22px;
    height: 22px;
    width: 22px;
  }

  span {
    outline: none;
  }
`;

export default WarningLightsOptionsGroup;
