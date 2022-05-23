import { addStyleForMobile } from '@vroom-web/ui-lib';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import HasAccidentInput from '../forminputs/HasAccidentInput';
import LienholderInput from '../forminputs/LienholderInput';
import LXBankNameInput from '../forminputs/LXBankNameInput';
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
      fields.lienholder.onChange({
        ...fields.lienholder,
        isRequired: fields.lienholder && isLienholderQuestionExperiment,
      });
    }
  }, [fields.lienholder, isLienholderQuestionExperiment]);

  useEffect(() => {
    if (lienholderRef.current !== fields.lienholder.value) {
      lienholderRef.current = fields.lienholder.value;
      fields.lxBankName.onChange({
        ...fields.lxBankName,
        isRequired:
          isLienholderQuestionExperiment &&
          fields.lienholder.value !== 'Neither',
        value:
          isLienholderQuestionExperiment &&
          fields.lienholder.value === 'Neither'
            ? ''
            : fields.lxBankName.value,
      });
    }
  }, [
    fields.lienholder.value,
    fields.lxBankName,
    isLienholderQuestionExperiment,
  ]);

  return (
    <>
      <HasAccidentInput field={fields.hasAccident} />
      <TitleStatusInput field={fields.titleStatus} />
      {isLienholderQuestionExperiment && (
        <>
          <LienholderInput field={fields.lienholder} />
          {['Lease', 'Loan'].includes(fields.lienholder.value) && (
            <LxInputContainer>
              <LXBankNameInput field={fields.lxBankName} />
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
