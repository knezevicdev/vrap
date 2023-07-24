import React from 'react';

import { FormStepProps } from '../../components/MultiStepForm';
import { Bold, Paragraph, SubmitButton } from './Styled.css';

const DocumentsVerificationStep = ({ nextStep }: FormStepProps) => {
  return (
    <div>
      <Paragraph>
        <Bold>Last Step:</Bold> To complete this sale, go to “My Documents” to
        upload required documents as soon as possible.
      </Paragraph>
      <SubmitButton onClick={nextStep}>PROVIDE DOCUMENTS</SubmitButton>
    </div>
  );
};

export default DocumentsVerificationStep;
