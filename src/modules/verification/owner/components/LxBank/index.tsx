import React, { ReactElement, useState } from 'react';

import loadOptions, { Option } from './loadOptions';
import { Autocomplete, Label, Tooltip, TooltipBold } from './Style.css';

import { FormField } from 'src/modules/appraisalform/components/componentInterfaces.d';

interface Props {
  field: Omit<FormField, 'onChange'> & {
    onChange: (bankName: string, lenderId: string) => void;
  };
}

const LxBank = ({ field: { label, onChange } }: Props): ReactElement => {
  const [, setInputValue] = useState('');

  return (
    <>
      <Label>{label}</Label>
      <Autocomplete
        isClearable
        placeholder="Enter your lien financial institution"
        classNamePrefix="rs"
        cacheOptions
        loadOptions={loadOptions}
        onInputChange={(inputVal: string) => {
          setInputValue(inputVal);
          return inputVal;
        }}
        formatCreateLabel={(inputVal: string) => `Use "${inputVal}"`}
        noOptionsMessage={() => null}
        onChange={(option) => {
          if (!option) {
            onChange('', '-1');
            return;
          }

          const { label, value, __isNew__: isNew } = option as Option & {
            __isNew__?: boolean;
          };

          if (isNew) {
            onChange(label, '-1');
          } else {
            onChange(label, value);
          }
        }}
      />
      <Tooltip>
        Don’t see your bank? <TooltipBold>Enter it manually</TooltipBold>
      </Tooltip>
    </>
  );
};

export default LxBank;
