import { Checkbox, Tooltip, Typography } from '@vroom-web/ui-lib';
import { omit } from 'lodash';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useIsInExperiment from '../../../../hooks/useIsInExperiment';
import { FormField, GenericObject } from '../../../../interfaces.d';
import useForm from '../useForm';
import EmissionStandardInput from './EmissionStandardInput';
import OtherAfterMarketInput from './OtherAfterMarketInput';

interface Props {
  field: FormField;
  emissionField: FormField;
  className?: string;
  otherAfterMarketField: FormField;
}

const AlternateAfterMarketModsOptionsGroup: React.FC<Props> = ({
  field,
  className,
  otherAfterMarketField,
  emissionField,
}) => {
  const { isInExperiment: isInShowWrappedCheckmarkExperiment } =
    useIsInExperiment('show-wrapped-checkmark');

  const lastEnabledEmissionRef = useRef<boolean>();
  const options = isInShowWrappedCheckmarkExperiment
    ? [
        'Stereo System',
        'Wheels and tires',
        'Exhaust',
        'Other',
        'Suspension',
        'Performance',
        'Wrapped',
      ]
    : [
        'Stereo System',
        'Wheels and tires',
        'Exhaust',
        'Suspension',
        'Performance',
        'Other',
      ];

  const showEmissionField =
    field.value.includes('Exhaust') ||
    field.value.includes('Performance') ||
    field.value.includes('Other');

  useEffect(() => {
    if (lastEnabledEmissionRef.current !== showEmissionField) {
      lastEnabledEmissionRef.current = showEmissionField;

      emissionField.onChange({
        ...emissionField,
        isRequired: showEmissionField,
        value: showEmissionField ? emissionField.value : '',
      });
    }
  }, [emissionField, showEmissionField]);

  const { onChange } = field;
  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt);
    return {
      ...result,
      [opt]: { value: optChecked, isRequired: false },
    };
  }, {});

  const optionsGroupForm = useForm({
    defaultValues: optionsDefaultVals,
    formKey: 'alternate',
  });

  const handleOptionClick = (key: string, clickedCheckbox: GenericObject) => {
    const localCheckedValuesForParent = Object.entries(optionsGroupForm.fields)
      .filter(([, field]) => (field as FormField).value)
      .map(([key]) => key);

    if (
      !clickedCheckbox.value &&
      localCheckedValuesForParent.indexOf(key) === -1
    ) {
      // if checkbox is checked and not yet in the checked array push it
      localCheckedValuesForParent.push(key);
      optionsGroupForm.updateMultipleFields({
        [key]: {
          ...clickedCheckbox,
          value: true,
        },
      });
    } else if (
      !clickedCheckbox.value === false &&
      localCheckedValuesForParent.indexOf(key) > -1
    ) {
      // if checkbox is not checked and already in the checked array remove it
      localCheckedValuesForParent.splice(
        localCheckedValuesForParent.indexOf(key),
        1
      );
      clickedCheckbox.onChange({
        ...clickedCheckbox,
        value: false,
      });
    }

    onChange({
      ...field,
      value: localCheckedValuesForParent,
    });
  };

  const checkboxes = Object.entries(optionsGroupForm.fields).map(
    ([key, option]) => {
      const typedOption: GenericObject = option as GenericObject;

      return (
        <AfterMarketModsOption
          key={key}
          htmlFor={key + '-checkbox'}
          checked={!!typedOption.value}
        >
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
        <Label>Aftermarket Modifications</Label>
        <Tooltip
          content={
            <span>
              Does your vehicle have any custom alterations or modifications?
              (select all that apply)
            </span>
          }
        />
      </LabelContainer>
      <AfterMarketModsOptionsLabel>
        Does your vehicle have any custom alterations or modifications? (select
        all that apply)
      </AfterMarketModsOptionsLabel>
      <CheckboxesContainer>{checkboxes}</CheckboxesContainer>
      {optionsGroupForm.fields.Other.value && (
        <OtherAfterMarketInput
          className={className}
          field={otherAfterMarketField}
        />
      )}
      {showEmissionField ? (
        <EmissionStandardInput field={emissionField} />
      ) : null}
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
  checked?: boolean;
}

const AfterMarketModsOption = styled((props) => (
  <li {...omit(props, ['checked'])} />
))<AfterMarketModsOptionProps>`
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
`;

export default AlternateAfterMarketModsOptionsGroup;
