import { Checkbox, Typography } from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import useForm from '../useForm';
import { FormFields } from './Inputs.language';
import OtherAfterMarketInput from './OtherAfterMarketInput';

interface Props {
  field: FormField;
  options?: [];
  className?: string;
  otherAfterMarketField: FormField;
}

const AfterMarketModsOptionsGroup: React.FC<Props> = ({
  field,
  className,
  otherAfterMarketField,
}) => {
  const [checkedValuesForParent, setCheckedValuesForParent] = useState(
    [] as string[]
  );
  const options = [
    FormFields.afterMarket.stereo,
    FormFields.afterMarket.wheels,
    FormFields.afterMarket.exhaust,
    FormFields.afterMarket.suspension,
    FormFields.afterMarket.performance,
    FormFields.afterMarket.other,
  ];

  const { onChange } = field;
  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt);
    return {
      ...result,
      [opt]: { value: optChecked, isRequired: false },
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
      const typedOption: GenericObject = option as GenericObject;

      return (
        <AfterMarketModsOption key={key} htmlFor={key + '-checkbox'}>
          <Checkbox
            name={key}
            id={key + '-checkbox'}
            label={key}
            onChange={() => handleOptionClick(key, typedOption)}
            checked={!!typedOption.value}
            dataQa="aftermarketoptioncheck"
          />
        </AfterMarketModsOption>
      );
    }
  );

  return (
    <div className={className}>
      <Label>{FormFields.afterMarket.label}</Label>
      <AfterMarketModsOptionsLabel>
        {FormFields.afterMarket.placeholder}
      </AfterMarketModsOptionsLabel>
      <CheckboxesContainer>{checkboxes}</CheckboxesContainer>
      {optionsGroupForm.fields.Other.value && (
        <OtherAfterMarketInput
          className={className}
          field={otherAfterMarketField}
        />
      )}
    </div>
  );
};

const Label = styled.h3`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
  font-weight: normal;
  margin-bottom: 0;

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const CheckboxesContainer = styled.ul`
  list-style: none;
  column-count: 2;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const AfterMarketModsOptionsLabel = styled(Typography.Body.Regular)`
  font-size: 13px;
  line-height: 13px;
  letter-spacing: 1px;
  margin-bottom: 10px;
  letter-spacing: 0.35px;
`;

const AfterMarketModsOption = styled(({ ...restProps }) => (
  <li {...restProps} />
))`
  padding: 0 0 5px;
`;

export default AfterMarketModsOptionsGroup;
