import { Checkbox } from '@vroom-web/ui-lib';
import React from 'react';

import { FormStepProps } from '../../components/MultiStepForm';
import PrevNextButtons from '../../components/WizardForm/PrevNextButtons';
import { CheckboxContainer } from './Styled.css';

const Review = ({ nextStep, goToStep }: FormStepProps) => {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <div>
      <CheckboxContainer>
        <Checkbox
          checked={isChecked}
          id={'verification-agreement-checkbox'}
          onChange={(): void => setChecked(!isChecked)}
          dataQa={'verification-agreement-checkbox'}
          label="I acknowledge that all information provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate."
        />
      </CheckboxContainer>
      <PrevNextButtons
        onPrev={() => goToStep(2)}
        onNext={nextStep}
        disableNext={!isChecked}
      />
    </div>
  );
};

export default Review;
