import { Checkbox } from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import useForm from '../useForm';
import { FormFields } from './Inputs.language';
import OtherOptionInput from './OtherOptionInput';

interface Props {
  field: FormField;
  className: string;
  otherWarningField: FormField;
}

const STATIC_URL = 'https://assets.vroomcdn.com/static-rebrand';

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
      value: FormFields.warningLightOptions.abs,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/abs-icon.png`,
    },
    {
      value: FormFields.warningLightOptions.airbag,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/air-bag-icon.png`,
    },
    {
      value: FormFields.warningLightOptions.checkEngine,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/check-engine-icon.png`,
    },
    {
      value: FormFields.warningLightOptions.transmission,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/transmission-icon.png`,
    },
    {
      value: FormFields.warningLightOptions.airConditioner,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/air-conditioner-icon.png`,
    },
    {
      value: FormFields.warningLightOptions.fluid,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/fluid-icon.png`,
    },
    {
      value: FormFields.warningLightOptions.serviceEngine,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/service-engine-icon.png`,
    },
    {
      value: FormFields.warningLightOptions.lowCoolant,
      imgSrc: `${STATIC_URL}/icons/vehicle-icons/low-coolant-icon.png`,
    },
    {
      value: FormFields.warningLightOptions.other,
    },
  ];

  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt.value);
    return {
      ...result,
      [opt.value]: { value: optChecked, isRequired: false, imgSrc: opt.imgSrc },
    };
  }, {});

  const optionsGroupForm = useForm({ defaultValues: optionsDefaultVals });

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
      const handleOnClick = (option: GenericObject) => {
        option.onChange({ ...field, checked: !option.value });
      };

      const checkboxProps = {
        name: key,
        id: key + '-checkbox',
        onChange: handleOnClick,
        checked: !!option.value,
      };

      return (
        <WarningOption
          key={key}
          htmlFor={key + '-checkbox'}
          onClick={() => handleOptionClick(key, option)}
        >
          <Checkbox {...checkboxProps}>
            <ImgContainer src={option.imgSrc} />
            <Label>{option.value}</Label>
          </Checkbox>
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
        <OtherOptionInput className={className} field={otherWarningField} />
      )}
    </div>
  );
};

const CheckboxesContainer = styled.ul`
  list-style: none;
  width: 100%;
`;

const ImgContainer = styled.img`
  height: 15px;
  width: 22px;
  margin-top: 2px;
  margin-right: 8px;
`;

const Label = styled.span`
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.3px;
`;

const WarningOptionsLabel = styled.div`
  padding: 0 0 10px;
`;

const WarningOption = styled(({ ...restProps }) => <li {...restProps} />)`
  padding: 0 0 10px;
`;

export default WarningLightsOptionsGroup;
