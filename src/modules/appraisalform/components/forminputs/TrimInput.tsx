import React from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import CircleLoader from '../CircleLoader';
import Dropdown from '../Dropdown';
import { FormFields } from './Inputs.language';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Props {
  field: FormField;
  className: string;
  customOptions: GenericObject[];
  onChange: (event: GenericObject) => void;
  trimLoader: boolean;
}

const TrimInput: React.FC<Props> = ({
  field,
  className,
  customOptions,
  onChange,
  trimLoader,
}) => {
  const analyticsHandler = new AnalyticsHandler();

  const handleOnChange = (event: GenericObject) => {
    analyticsHandler.trackTrimChange();
    const evtValue = event.target.value;
    const error = value === 'Trim';
    const trimOption = customOptions.find((t) => t.trim === evtValue);
    const { value, trimId, tOptions } = trimOption;
    onChange({ ...field, value, trimId, error, tOptions });
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
          onChange: handleOnChange,
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

export default TrimInput;
