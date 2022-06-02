import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '../../../Dialog/VinInformation';
import CircleLoader from '../../CircleLoader';
import { lettersAndNumbersOnly } from '../../formatting';
import Input from '../../Input';
import { FormFields } from '../Inputs.language';

import Icon, { Icons } from 'src/core/Icon';

const VinFormInput: React.FC<any> = ({
  field,
  className,
  vinLoader,
  handleUpdate,
  onKeyPressEnter,
  disabled = false,
}) => {
  const { onChange } = field;
  const [showVinDialog, setShowVinDialog] = useState(false);

  const handleOnChange = (event: any) => {
    const value = lettersAndNumbersOnly(event.target.value, 17);

    // https://tdalabs.atlassian.net/browse/AC-241
    if (handleUpdate && field.value != value) {
      handleUpdate(value);
    } else {
      onChange({ ...field, value });
    }
  };

  const handleShowVinDialog = () => {
    setShowVinDialog(true);
  };

  const handleHideVinDialog = () => {
    setShowVinDialog(false);
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
              <InfoButton onClick={() => handleShowVinDialog()}>
                <VinInfoIcon icon={Icons.INFO} />
              </InfoButton>
            </LabelSpan>
          ),
          onChange: handleOnChange,
          onKeyPress: onKeyPressEnter,
          dataQa: 'Vin Number',
          disabled,
        }}
      />
      {vinLoader && <Loader isLoading={vinLoader} />}
      {showVinDialog && <Dialog closeModalHandler={handleHideVinDialog} />}
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
  height: 13px;
  width: 13px;
  cursor: pointer;
`;

const Loader = styled(CircleLoader)`
  position: relative;
  margin: -5px 5px 5px 10px;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export default VinFormInput;
