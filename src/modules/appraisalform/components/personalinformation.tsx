import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useIsTradeIn from '../../../hooks/useIsTradeIn';
import { FormField } from '../../../interfaces.d';
import useAppraisalStore from '../../../store/appraisalStore';
import { UseForm } from './componentInterfaces.d';
import EmailInput from './forminputs/EmailInput';
import FirstNameInput from './forminputs/FirstNameInput';
import LastNameInput from './forminputs/LastNameInput';
import PhoneInput from './forminputs/PhoneInput';

export interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
}

const PersonalInformation: React.FC<Props> = ({ fields, form }) => {
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const user = useAppraisalStore((state) => state.user);
  const isTradeIn = useIsTradeIn();

  const prepopulateUserData = () => {
    form.updateMultipleFields({
      firstName: {
        ...fields.firstName,
        value: fields.firstName.value || user?.firstName,
      },
      lastName: {
        ...fields.lastName,
        value: fields.lastName.value || user?.lastName,
      },
      email: {
        ...fields.email,
        value: fields.email.value || user?.username,
      },
      phoneNumber: {
        ...fields.phoneNumber,
        value:
          fields.phoneNumber.value ||
          (user?.phones?.length && user.phones[0]?.number) ||
          '',
      },
    });
  };

  useEffect(() => {
    if (isTradeIn && user?.username) {
      setIsEmailDisabled(true);
    }
  }, [isTradeIn, user?.username]);

  useEffect(() => {
    if (Object.keys(user).length) {
      prepopulateUserData();
    }
  }, [user]);

  return (
    <>
      <InputContainer>
        <First field={fields.firstName} />
        <Last field={fields.lastName} />
      </InputContainer>
      <InputContainer>
        <Email disabled={isEmailDisabled} field={fields.email} />
        <Phone field={fields.phoneNumber} optional={true} />
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

const Email = styled(EmailInput)<{ disabled: boolean }>`
  width: 50%;
  margin-right: 10px;

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 16px;
  }
`;

export default PersonalInformation;
