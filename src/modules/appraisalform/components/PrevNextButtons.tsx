import { addStyleForMobile, Button } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

export const BackText = 'Back';
export const NextText = 'NEXT';

interface Props {
  goToPrevStep: () => void;
  goToNextStep: (e: any, onNextIntercept: any) => void;
  hidePrevButton?: boolean;
  nextDisabled: boolean;
  nextButtonLabel: string;
  nextDataQa?: string;
}

const PrevNextButtons: React.FC<Props> = ({
  goToPrevStep,
  goToNextStep,
  nextDisabled,
  nextButtonLabel,
  hidePrevButton,
  nextDataQa,
}) => (
  <ButtonContainer>
    {!hidePrevButton && (
      <BackButton onClick={goToPrevStep} data-qa={'Back'}>
        <CancelButtonText>{BackText}</CancelButtonText>
      </BackButton>
    )}
    <NextButton
      onClick={goToNextStep}
      disabled={nextDisabled}
      label={nextButtonLabel}
      hide={hidePrevButton}
      data-qa={nextDataQa || 'Continue'}
    >
      {nextButtonLabel || NextText}
    </NextButton>
  </ButtonContainer>
);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const NextButton = styled(({ label, hide, ...restProps }) => (
  <Button.Primary {...restProps} />
))`
  width: auto;
  min-width: 180px;
  ${addStyleForMobile(`
    min-width: ${(props: any) => (props.label ? '205px' : '0px')};
    width: ${(props: any) => (props.hide ? '100%;' : '50%')};
  `)}
`;

const BackButton = styled(Button.Primary)`
  width: 180px;
  background-color: white;
  border: #bfbebe solid 1px;
  ${addStyleForMobile(`
    width: 50%;
  `)};

  :hover {
    & > span {
      color: white;
    }
  }
`;

const CancelButtonText = styled.span`
  color: #bfbebe;
`;

export default PrevNextButtons;
