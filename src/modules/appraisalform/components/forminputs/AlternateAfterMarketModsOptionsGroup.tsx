import { Checkbox, Tooltip, Typography } from '@vroom-web/ui-lib';
import { omit } from 'lodash';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import useForm from '../useForm';
import { FormFields } from './Inputs.language';
import OtherAfterMarketInput from './OtherAfterMarketInput';

interface Props {
  field: FormField;
  className?: string;
  otherAfterMarketField: FormField;
  newForm?: boolean;
}

const AlternateAfterMarketModsOptionsGroup: React.FC<Props> = ({
  field,
  className,
  otherAfterMarketField,
  newForm,
}) => {
  const [checkedValuesForParent, setCheckedValuesForParent] = useState(
    [] as string[]
  );
  const options = [
    FormFields.alternateAfterMarket.stereo,
    // FormFields.alternateAfterMarket.sunroof,
    FormFields.alternateAfterMarket.wheels,
    FormFields.alternateAfterMarket.exhaust,
    FormFields.alternateAfterMarket.suspension,
    FormFields.alternateAfterMarket.performance,
    FormFields.alternateAfterMarket.other,
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
        <AfterMarketModsOption key={key} htmlFor={key + '-checkbox'} checked={!!typedOption.value} newForm={newForm}>
          <Checkbox
            name={key}
            id={key + '-checkbox'}
            label={key}
            onChange={() => handleOptionClick(key, typedOption)}
            checked={!!typedOption.value}
            dataQa="altaftermarketoptioncheck"
          />
        </AfterMarketModsOption>
      );
    }
  );

  return (
    <div className={className}>
      <LabelContainer>
        <Label>{FormFields.alternateAfterMarket.label}</Label>
        <Tooltip
          content={<span>{FormFields.alternateAfterMarket.toolTip}</span>}
        />
      </LabelContainer>
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
  margin: 0;

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
  margin: 0 0 8px;

  button {
    margin-left: 5px;
    height: auto;
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
  display: inline-block;
  font-size: 13px;
  line-height: 13px;
  margin-bottom: 10px;
  letter-spacing: 0.35px;
`;

interface AfterMarketModsOptionProps {
  newForm?: boolean;
  checked?: boolean;
}

const AfterMarketModsOption = styled((props) => (
  <li {...omit(props, ['checked', 'newForm'])} />
))<AfterMarketModsOptionProps>`
  padding: 0 0 8px;

  ${({ newForm }) =>
    newForm &&
    css<AfterMarketModsOptionProps>`
      label::before {
        background-color: ${({ checked }) => (checked ? '#E71321' : '#f5f5f5')};
        border-color: #979797;
        border-radius: 4px;
        min-width: 22px;
        min-height: 22px;
        max-width: 22px;
        max-height: 22px;
      }
    `}
`;

export default AlternateAfterMarketModsOptionsGroup;
