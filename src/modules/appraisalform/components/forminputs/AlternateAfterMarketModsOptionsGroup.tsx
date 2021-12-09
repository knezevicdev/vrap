import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';
import useForm from '@app/components/Form/useForm';
import Checkbox from '@app/components/Checkbox';
import OtherAfterMarketInput from '@app/components/Form/Inputs/AppraisalFormInput/OtherAfterMarketInput';
import ToolTip from '@app/components/ToolTip';
import Icon from '@app/components/Icon';

const tooltip_icon = require('@static/icons/svg/tooltip.svg');

const AlternateAfterMarketModsOptionsGroup = ({
  field,
  className,
  otherAfterMarketField
}) => {
  const [checkedValuesForParent, setCheckedValuesForParent] = useState([]);
  const options = [
    FormFields.alternateAfterMarket.stereo,
    // FormFields.alternateAfterMarket.sunroof,
    FormFields.alternateAfterMarket.wheels,
    FormFields.alternateAfterMarket.exhaust,
    FormFields.alternateAfterMarket.suspension,
    FormFields.alternateAfterMarket.performance,
    FormFields.alternateAfterMarket.other
  ];

  const { onChange } = field;
  const optionsDefaultVals = options.reduce((result, opt) => {
    const optChecked = field.value.includes(opt);
    return {
      ...result,
      [opt]: { value: optChecked, isRequired: false }
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
        <AfterMarketModsOption
          key={key}
          htmlFor={key + '-checkbox'}
          onClick={() => handleOptionClick(key, option)}
        >
          <Option
            name={key}
            id={key + '-checkbox'}
            field={{
              ...option,
              checked: !!option.value,
              label: key
            }}
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
          <RowTitleIcon id={tooltip_icon} />
        </ToolTip>
      </LabelContainer>
      <AfterMarketModsOptionsLabel>
        {FormFields.afterMarket.placeholder}
      </AfterMarketModsOptionsLabel>
      <CheckboxesContainer>{checkboxes}</CheckboxesContainer>
      {optionsGroupForm.fields.Other.value && (
        <OtherAfterMarketInput field={otherAfterMarketField} />
      )}
    </div>
  );
};

const Label = styled.h3`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;

  ${props => props.theme.media.lte('mobile')} {
    font-size: 16px;
  }
`;

const RowTitleIcon = styled(Icon)`
  margin: 8px 0 0 5px;

  ${props => props.theme.media.mobile} {
    margin: 4px 0 0 5px;
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

const AfterMarketModsOptionsLabel = styled.div`
  ${props => props.theme.typography.h14()}
  margin-bottom: 10px;
  letter-spacing: 0.35px;
`;

const AfterMarketModsOption = styled.li`
  padding: 0 0 10px;
`;

const Option = styled(Checkbox)``;

AlternateAfterMarketModsOptionsGroup.propTypes = {
  field: PropTypes.object,
  options: PropTypes.array,
  className: PropTypes.string,
  otherAfterMarketField: PropTypes.object
};

export default AlternateAfterMarketModsOptionsGroup;
