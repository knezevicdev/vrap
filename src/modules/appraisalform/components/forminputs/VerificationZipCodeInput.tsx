import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import { getZipCodeValidation } from '../../../../networking/request';
import CircleLoader from '../CircleLoader';
import { displayZipCode, numbersOnlyString } from '../formatting';
import Input from '../Input';
import { isValidZipCode } from '../validation';

interface Props {
  field: FormField;
  className?: string;
}

const VerificationZipCodeInput: React.FC<Props> = ({ field, className }) => {
  const { value, onChange } = field;
  const number = numbersOnlyString(value);
  const zip = displayZipCode(number);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnChange = async (event: GenericObject) => {
    const value = event.target.value;
    onChange({ ...field, value });

    const isValidZip = isValidZipCode(value);
    if (isValidZip) {
      try {
        setIsLoading(true);
        const { data } = await getZipCodeValidation(value);
        onChange({ ...field, value, error: !data?.isZipValid });
      } finally {
        setIsLoading(false);
      }
    } else {
      onChange({ ...field, value, error: true });
    }
  };

  return (
    <ZipCodeContainer>
      <Input
        className={className}
        field={{
          ...field,
          placeholder: 'Zip code',
          label: 'Zip Code',
          value: zip,
          onChange: handleOnChange,
          maxlength: '5',
        }}
      />
      {isLoading && <Loader isLoading={isLoading} />}
    </ZipCodeContainer>
  );
};

const Loader = styled(CircleLoader)`
  position: absolute;
  top: 32px;
  right: -30px;
`;

const ZipCodeContainer = styled.div`
  position: relative;
`;

export default VerificationZipCodeInput;
