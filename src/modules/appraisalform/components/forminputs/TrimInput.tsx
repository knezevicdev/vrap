import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { useAppStore } from '../../../../context';
import CircleLoader from '../CircleLoader';
import Select from '../Select';
import { FormFields } from './Inputs.language';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { FormField } from 'src/interfaces.d';

interface Props {
  field: FormField;
  className?: string;
  customOptions: SelectItem[];
  onChange: (value: any, error: boolean) => void;
  trimLoader: boolean;
}

const TrimInput: React.FC<Props> = ({
  field,
  className,
  customOptions,
  onChange,
  trimLoader,
}) => {
  const { store } = useAppStore();
  const analyticsHandler = new AnalyticsHandler();
  const handleOnChange = (changes: SelectChanges<SelectItem>) => {
    analyticsHandler.trackTrimChange(store.appraisal.eventCategory);
    const trimOption: any = changes.selectedItem;
    const { value, id, tOptions } = trimOption;
    onChange({ ...field, value, trimId: id, tOptions }, false);
  };

  return (
    <>
      <Select
        className={className}
        field={{
          ...field,
          defaultLabel: FormFields.trim.placeholder,
          label: FormFields.trim.label,
          options: customOptions,
          onChange: handleOnChange,
        }}
      />
      {trimLoader && (
        <LoaderContainer>
          <Loader isLoading={trimLoader} />
        </LoaderContainer>
      )}
    </>
  );
};

const Loader = styled(CircleLoader)`
  position: relative;
  margin: -5px 5px 5px 10px;
  @media (max-width: 768px) {
    top: 5px;
  }
`;

const LoaderContainer = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export default TrimInput;
