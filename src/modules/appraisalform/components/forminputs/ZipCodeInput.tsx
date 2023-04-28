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

const ZipCodeInput: React.FC<Props> = ({ field, className }) => {
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
    <>
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
      {isLoading && (
        <LoaderContainer>
          <Loader isLoading={isLoading} />
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

export default ZipCodeInput;
