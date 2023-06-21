import { Checkbox } from '@vroom-web/ui-lib';
import React from 'react';

import { FormStepProps } from '../../components/MultiStepForm';
import { CheckboxContainer, SubmitButton } from './Styled.css';

const Review = ({ nextStep }: FormStepProps) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div>
      <CheckboxContainer>
        <Checkbox
          checked={checked}
          id={'verification-agreement-checkbox'}
          onChange={(): void => setChecked(!checked)}
          dataQa={'verification-agreement-checkbox'}
          label="I acknowledge that all information provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate."
        />
      </CheckboxContainer>
      <SubmitButton disabled={!checked} onClick={nextStep}>
        SUBMIT MY INFORMATION
      </SubmitButton>
    </div>
  );
};

export default Review;
