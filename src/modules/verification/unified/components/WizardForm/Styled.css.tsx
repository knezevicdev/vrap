import { Button } from '@vroom-web/ui-lib';
import StepWizard from 'react-step-wizard';
import styled from 'styled-components';

export const NextButton = styled(Button.Primary)`
  width: 100%;
`;

export const PrevButton = styled(Button.Secondary)`
  width: 100%;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 20px;
  max-width: calc(50% + 20px);

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

export const Wizard = styled(StepWizard)`
  flex-direction: column-reverse;
  display: flex;
`;
