import { Checkbox, Typography } from '@vroom-web/ui-lib';
import { addStyleForMobile } from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import { ReactComponent as InfoSvg } from '../info.svg';
import ToolTip from '../ToolTip';
import useForm from '../useForm';
import { FormFields } from './Inputs.language';
import OtherAfterMarketInput from './OtherAfterMarketInput';

interface Props {
  field: FormField;
  className?: string;
  otherAfterMarketField: FormField;
}

const AlternateAfterMarketModsOptionsGroup: React.FC<Props> = ({
  field,
  className,
  otherAfterMarketField,
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
      <LabelContainer>
        <Label>{FormFields.alternateAfterMarket.label}</Label>
        <ToolTip
          arrow={true}
          content={<span>{FormFields.alternateAfterMarket.toolTip}</span>}
          interactive={true}
        >
          <InfoIcon />
        </ToolTip>
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

const InfoIcon = styled(InfoSvg)`
  margin: 8px 0 0 5px;

  ${addStyleForMobile(`
    margin: 4px 0 0 5px;
  `)}
`;

const Label = styled.h3`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const CheckboxesContainer = styled.ul`
  list-style: none;
  column-count: 2;
  width: 100%;
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
  padding: 0 0 10px;
`;

const Option = styled(Checkbox)``;

export default AlternateAfterMarketModsOptionsGroup;
