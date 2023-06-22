import React from 'react';

import { FormStepProps } from '../../components/MultiStepForm';
import { Bold, SubmitButton } from './Styled.css';

const DocumentsVerificationStep = ({ nextStep }: FormStepProps) => {
  return (
    <div>
      <p>
        <Bold>Last Step:</Bold> To complete this sale, go to “My Documents” to
        upload required documents as soon as possible.
      </p>
      <SubmitButton onClick={nextStep}>UPLOAD DOCUMENTS</SubmitButton>
    </div>
  );
};

export default DocumentsVerificationStep;
