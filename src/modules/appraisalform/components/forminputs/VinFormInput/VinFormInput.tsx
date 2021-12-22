import CircleLoader from '@app/components/CircleLoader';
import Icon from '@app/components/Icon';
import Input from '@app/components/Input';
import { VROOM_VIN_SUBSTRING } from '@app/constants/misc';
import { lettersAndNumbersOnly } from '@app/lib/validation/formatting';
import { getVinErrors, isValidVin } from '@app/lib/validation/validation';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { FormFields } from '../Inputs.language';

const questionCircleIcon = require('@static/icons/svg/question-circle.svg');

const VinFormInput = ({
  showDialog,
  field,
  className,
  vinLoader,
  handleUpdate,
  onKeyPressEnter,
}) => {
  const { onChange } = field;

  const handleOnChange = (event) => {
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
                id={questionCircleIcon}
                onClick={() => showDialog('VinInformationDialog')}
              />
            </LabelSpan>
          ),
          onChange: handleOnChange,
          onKeyPress: onKeyPressEnter,
          dataQa: 'Vin Number',
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

VinFormInput.propTypes = {
  showDialog: PropTypes.func.isRequired,
  field: PropTypes.object,
  className: PropTypes.string,
  vinLoader: PropTypes.bool,
  handleUpdate: PropTypes.func,
  onKeyPressEnter: PropTypes.func,
};

export default VinFormInput;
