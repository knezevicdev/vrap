import { Checkbox } from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import useForm from '../useForm';
import { FormFields } from './Inputs.language';
import OtherAfterMarketInput from './OtherAfterMarketInput';

interface Props {
  field: FormField;
  options: [];
  className: string;
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
      const handleOnClick = (option: GenericObject) => {
        option.onChange({ ...field, checked: !option.value });
      };

      return (
        <AfterMarketModsOption
          key={key}
          htmlFor={key + '-checkbox'}
          onClick={() => handleOptionClick(key, option)}
        >
          <Option
            name={key}
            id={key + '-checkbox'}
            label={key}
            onChange={handleOnClick}
            checked={!!option.value}
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

  ${(props) => props.theme.media.lte('mobile')} {
    font-size: 16px;
  }
`;

const CheckboxesContainer = styled.ul`
  list-style: none;
  column-count: 2;
  width: 100%;
`;

const AfterMarketModsOptionsLabel = styled.div`
  ${(props) => props.theme.typography.h14()}
  margin-bottom: 10px;
  letter-spacing: 0.35px;
`;

const AfterMarketModsOption = styled(({ ...restProps }) => (
  <li {...restProps} />
))`
  padding: 0 0 10px;
`;

const Option = styled(Checkbox)``;

export default AfterMarketModsOptionsGroup;
