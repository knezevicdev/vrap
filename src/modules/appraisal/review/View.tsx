import {
  addStyleForMobile,
  Button,
  Typography,
  VroomSpinner,
} from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ExteriorCondition from './components/ExteriorCondition';
import InteriorCondition from './components/InteriorCondition';
import MechanicalCondition from './components/MechanicalCondition';
import PersonalInformation from './components/PersonalInformation';
import VehicleHistory from './components/VehicleHistory';
import VehicleInformation from './components/VehicleInformation';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const AppraisalReviewViewDetail: React.FC<Props> = ({ viewModel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const submitButtonClasses = ['btn', 'btn-primary', 'finish-section-btn'];
  const canSubmit = !(isLoading || viewModel.appraisalStore ? true : false);

  useEffect(() => {
    if (viewModel.isAppraisalEmpty()) {
      viewModel.redirectToAppraisalForm();
    } else {
      viewModel.trackIdentify();
    }
  }, [viewModel]);

  if (isLoading) {
    submitButtonClasses.push('submitting');
  }

  const handleSubmit = (): void => {
    setIsLoading(true);
    viewModel.submitAppraisal().then(() => {
      setIsLoading(false);
    });
  };

  return (
    <Container>
      {isLoading && (
        <WhiteBox>
          <SpinnerContainer>
            <VroomSpinner />
          </SpinnerContainer>
        </WhiteBox>
      )}
      <Title>{viewModel.title}</Title>
      <Line />
      <VehicleInformation />
      <Line />
      <VehicleHistory />
      <Line />
      <InteriorCondition />
      <Line />
      <ExteriorCondition />
      <Line />
      <MechanicalCondition />
      <Line />
      <PersonalInformation />
      <SubmitContainer>
        <SubmitButton
          className={submitButtonClasses.join(' ')}
          disabled={canSubmit}
          onClick={handleSubmit}
        >
          {isLoading ? 'Submitting' : 'Get My Price'}
        </SubmitButton>
        <TextContainer>
          By clicking Get My Price, you consent to receive autodialed calls and
          text messages from or on behalf of Vroom at the telephone numbers(s)
          provided above, including your wireless number, if applicable,
          regarding your interest in buying or selling a car and for other
          marketing purposes. Calls may be pre-recorded. You understand that
          consent is not a condition of purchase. Read our
          <a
            href="/legal/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>
          and
          <a
            href="/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy.
          </a>
        </TextContainer>
      </SubmitContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 768px;
  padding: 40px;
  border: solid 1px #d6d7da;
  margin-bottom: 20px;
  @media (max-width: 1020px) {
    max-width: 100%;
    padding: 30px 24px;
    margin: 0 10px;
  }

  @media (max-width: 720px) {
    margin: 0;
  }
`;

const SubmitButton = styled(Button.Primary)`
  margin: 24px 0 20px 0;
  padding: 6px 12px;
  border: none;
  border-radius: 0;
  display: inline-block;
  cursor: pointer;
  width: 280px;
  height: 40px;
  min-height: 40px;
  background-color: #d6d7da;
  font-size: 16px;
  font-family: Calibre-Semibold;
  font-weight: normal;
  text-align: center;
  line-height: 1;
  letter-spacing: 1.8px;
  min-width: 143px;
  color: #fff !important;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
  transition: color 0.1s, background-color 0.1s;
  box-shadow: none;
  &:not([disabled]) {
    background: #e7131a;
    color: #fff;
    &:hover {
      background: #fc4349;
    }
  }
`;

const Title = styled(Typography.Heading.Three)`
  font-style: 'italic';
  font-family: Vroom-Sans;
  font-weight: 800;
  line-height: 36px;
  padding: 0 0 24px 0;
  @media (max-width: 767px) {
    padding: 16px 0;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d6d7da;
`;

const SubmitContainer = styled.div`
  text-align: center;
  width: 100%;
  position: fixed;
  background: white;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e0e0e0;
`;

const TextContainer = styled.p`
  margin: auto;
  margin-bottom: 15px;
  font-family: Calibre-Regular;
  font-size: 13px;
  color: #041022;
  cursor: pointer;
  text-align: center;
  line-height: 15px;
  letter-spacing: 0.35px;
  width: 585px;
  a {
    color: #e7131a;
    text-decoration: none;
    padding: 0 2px;
  }
  ${addStyleForMobile(`
    width: 100%;
    padding: 0 10px;
  `)}
`;

const WhiteBox = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
`;

export default observer(AppraisalReviewViewDetail);
