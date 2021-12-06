import React from 'react';
import Dropdown from '@app/components/Dropdown';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';
import CircleLoader from '@app/components/CircleLoader';
import { trackTrimChange } from '@app/lib/analytics/analytics/appraisal';

const TrimInput = ({
  field,
  className,
  customOptions,
  onChange,
  trimLoader
}) => {
  const handleOnChange = event => {
    trackTrimChange();
    const evtValue = event.target.value;
    const error = value === 'Trim';
    const trimOption = customOptions.find(t => t.long_description === evtValue);
    const { value, tOptions } = trimOption;
    onChange({ ...field, value, tOptions });
  };

  return (
    <>
      <Dropdown
        className={className}
        field={{
          ...field,
          defaultLabel: FormFields.trim.placeholder,
          label: FormFields.trim.label,
          customOptions,
          onChange: handleOnChange
        }}
      />
      {trimLoader && <Loader isLoading={trimLoader} />}
    </>
  );
};

const Loader = styled(CircleLoader)`
  position: relative;
  margin: -5px 5px 5px 10px;
`;

TrimInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  customOptions: PropTypes.array,
  onChange: PropTypes.func,
  trimLoader: PropTypes.bool
};

export default TrimInput;
