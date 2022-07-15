import React from 'react';
import styled from 'styled-components';

import EmailInput from './forminputs/EmailInput';
import FirstNameInput from './forminputs/FirstNameInput';
import LastNameInput from './forminputs/LastNameInput';
import PhoneInput from './forminputs/PhoneInput';

export interface Props {
  fields: any;
}

const PersonalInformation: React.FC<Props> = ({ fields }) => {
  return (
    <>
      <InputContainer>
        <First field={fields.firstName} className="fs-mask" />
        <Last field={fields.lastName} className="fs-mask" />
      </InputContainer>
      <InputContainer>
        <Email field={fields.email} className="fs-mask" />
        <Phone field={fields.phoneNumber} className="fs-mask" optional={true} />
      </InputContainer>
    </>
  );
};

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-top: 20px;
  justify-content: space-between;

  @media (max-width: 767px) {
    display: block;
    margin-bottom: 0px;
  }
`;

const First = styled(FirstNameInput)`
  width: 50%;
  margin-right: 10px;

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 16px;
  }
`;

const Last = styled(LastNameInput)`
  margin-left: 10px;
  width: 50%;

  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

const Phone = styled(PhoneInput)`
  margin-left: 10px;
  width: 50%;

  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

const Email = styled(EmailInput)`
  width: 50%;
  margin-right: 10px;

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 16px;
  }
`;

export default PersonalInformation;
