import { addStyleForMobile } from '@vroom-web/ui-lib';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import BankNameInput from '../forminputs/BankNameInput';
import HasAccidentInput from '../forminputs/HasAccidentInput';
import LienholderInput from '../forminputs/LienholderInput';
import TitleStatusInput from '../forminputs/TitleStatusInput';
import ViewModel from './ViewModel';

interface Props {
  fields: Record<string, FormField>;
  disableExperiments: boolean;
  viewModel: ViewModel;
}

const VehicleHistoryView: React.FC<Props> = ({
  fields,
  viewModel,
  disableExperiments,
}) => {
  const isLienholderQuestionExperimentRef = useRef<boolean>();
  const lienholderRef = useRef<boolean>();

  const isLienholderQuestionExperiment = disableExperiments
    ? false
    : viewModel.isLienholderQuestionExperiment();

  useEffect(() => {
    if (
      isLienholderQuestionExperimentRef.current !==
      isLienholderQuestionExperiment
    ) {
      isLienholderQuestionExperimentRef.current = isLienholderQuestionExperiment;
      fields.lienType.onChange({
        ...fields.lienType,
        isRequired: fields.lienType && isLienholderQuestionExperiment,
      });
    }
  }, [fields.lienType, isLienholderQuestionExperiment]);

  useEffect(() => {
    if (lienholderRef.current !== fields.lienType.value) {
      lienholderRef.current = fields.lienType.value;
      fields.bankName.onChange({
        ...fields.bankName,
        isRequired:
          isLienholderQuestionExperiment && fields.lienType.value !== 'Neither',
        value:
          isLienholderQuestionExperiment && fields.lienType.value === 'Neither'
            ? ''
            : fields.bankName.value,
      });
    }
  }, [fields.lienType.value, fields.bankName, isLienholderQuestionExperiment]);

  return (
    <>
      <HasAccidentInput field={fields.hasAccident} />
      <TitleStatusInput field={fields.titleStatus} />
      {isLienholderQuestionExperiment && (
        <>
          <LienholderInput field={fields.lienType} />
          {['Lease', 'Loan'].includes(fields.lienType.value) && (
            <LxInputContainer>
              <BankNameInput field={fields.bankName} />
            </LxInputContainer>
          )}
        </>
      )}
    </>
  );
};

const LxInputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  ${addStyleForMobile(`
    margin-bottom: 0px;
  `)}
`;

export default VehicleHistoryView;
