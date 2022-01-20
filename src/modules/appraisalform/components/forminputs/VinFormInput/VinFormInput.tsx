import React from 'react';
import styled from 'styled-components';

import { VROOM_VIN_SUBSTRING } from '../../../constants/misc';
import CircleLoader from '../../CircleLoader';
import { lettersAndNumbersOnly } from '../../formatting';
import Input from '../../Input';
import { getVinErrors, isValidVin } from '../../validation';
import { FormFields } from '../Inputs.language';

import Icon, { Icons } from 'src/core/Icon';

const VinFormInput: React.FC<any> = ({
  showDialog,
  field,
  className,
  vinLoader,
  handleUpdate,
  onKeyPressEnter,
  disabled = false,
}) => {
  const { onChange } = field;

  const handleOnChange = (event: any) => {
    const value = lettersAndNumbersOnly(event.target.value, 17);
    const error = !value.includes(VROOM_VIN_SUBSTRING) && !isValidVin(value);
    const errorMessage = getVinErrors(value);

    // https://tdalabs.atlassian.net/browse/AC-241
    if (handleUpdate && field.value != value) {
      handleUpdate(value);
    } else {
      onChange({ ...field, value, error, errorMessage });
    }
  };

  const { placeholder, label } = FormFields.vin;

  return (
    <Container>
      <VinField
        className={className}
        field={{
          ...field,
          placeholder: placeholder,
          label: (
            <LabelSpan>
              {label}{' '}
              <VinInfoIcon
                icon={Icons.QUESTION_CIRCLE}
                onClick={() => showDialog('VinInformationDialog')}
              />
            </LabelSpan>
          ),
          onChange: handleOnChange,
          onKeyPress: onKeyPressEnter,
          dataQa: 'Vin Number',
          disabled,
        }}
      />
      {vinLoader && <Loader isLoading={vinLoader} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const VinField = styled(Input)`
  width: 100%;
  display: flex;

  & label,
  span {
    text-align: left;
  }

  & input {
    width: 100%;
  }
`;

const LabelSpan = styled.span`
  display: flex;
`;

const VinInfoIcon = styled(Icon)`
  margin-left: 5px;
  cursor: pointer;
`;

const Loader = styled(CircleLoader)`
  position: relative;
  margin: -5px 5px 5px 10px;
`;

export default VinFormInput;
