import { selectExperiment } from '@app/store/absmartly/selectors';
import { AC_APPRAISAL_INTENT_QUESTION_2 } from '@app/store/absmartly/types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import styled from 'styled-components';

import EmailInput from './forminputs/EmailInput';
import FirstNameInput from './forminputs/FirstNameInput';
import LastNameInput from './forminputs/LastNameInput';
import LookingToAccomplishInput from './forminputs/LookingToAccomplishInput';
import PhoneInput from './forminputs/PhoneInput';
import ZipCodeInput from './forminputs/ZipCodeInput';

const PersonalInformation = ({
  fields,
  disableExperiments,
  isAppraisalIntentExperiment,
}) => {
  isAppraisalIntentExperiment = disableExperiments
    ? false
    : isAppraisalIntentExperiment;

  return (
    <>
      <InputContainer>
        <First field={fields.firstName} className="fs-mask" />
        <Last field={fields.lastName} className="fs-mask" />
      </InputContainer>
      <InputContainer>
        <Email field={fields.email} className="fs-mask" />
      </InputContainer>
      <InputContainer>
        <Phone field={fields.phoneNumber} className="fs-mask" optional={true} />
        <Zip field={fields.zipCode} />
      </InputContainer>
      {isAppraisalIntentExperiment && (
        <InputContainer>
          <LookingToAccomplish field={fields.appraisalIntent} />
        </InputContainer>
      )}
    </>
  );
};

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-top: 20px;
  justify-content: space-between;

  ${(props) => props.theme.media.mobile} {
    display: block;
    margin-bottom: 0px;
  }
`;

const First = styled(FirstNameInput)`
  width: 50%;
  margin-right: 10px;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 16px;
  }
`;

const Last = styled(LastNameInput)`
  margin-left: 10px;
  width: 50%;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

const Phone = styled(PhoneInput)`
  width: 50%;
  margin-right: 10px;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 16px;
  }
`;

const Zip = styled(ZipCodeInput)`
  margin-left: 10px;
  width: 50%;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

const Email = styled(EmailInput)`
  width: 100%;

  ${(props) => props.theme.media.mobile} {
    margin-bottom: 16px;
  }
`;

const LookingToAccomplish = styled(LookingToAccomplishInput)`
  width: 100%;

  ${(props) => props.theme.media.mobile} {
    margin-bottom: 16px;
  }
`;

const mapStateToProps = (state) => {
  return {
    isAppraisalIntentExperiment: selectExperiment(
      state,
      AC_APPRAISAL_INTENT_QUESTION_2
    ),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(PersonalInformation);
