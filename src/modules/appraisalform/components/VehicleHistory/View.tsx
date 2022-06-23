import { addStyleForMobile } from '@vroom-web/ui-lib';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import BankNameInput from '../forminputs/BankNameInput';
import HasAccidentInput from '../forminputs/HasAccidentInput';
import LienholderInput from '../forminputs/LienholderInput';
import TitleStatusInput from '../forminputs/TitleStatusInput';

interface Props {
  fields: Record<string, FormField>;
}

const VehicleHistoryView: React.FC<Props> = ({ fields }) => {
  const lienholderRef = useRef<boolean>();

  useEffect(() => {
    if (lienholderRef.current !== fields.lienType.value) {
      lienholderRef.current = fields.lienType.value;
      fields.bankName.onChange({
        ...fields.bankName,
        isRequired: fields.lienType.value !== 'Neither',
        value: fields.lienType.value === 'Neither' ? '' : fields.bankName.value,
      });
    }
  }, [fields.lienType.value, fields.bankName]);

  return (
    <>
      <HasAccidentInput field={fields.hasAccident} />
      <TitleStatusInput field={fields.titleStatus} />
      <LienholderInput field={fields.lienType} />
      {['Lease', 'Loan'].includes(fields.lienType.value) && (
        <LxInputContainer>
          <BankNameInput field={fields.bankName} />
        </LxInputContainer>
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