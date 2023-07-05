import { addStyleForMobile } from '@vroom-web/ui-lib';
import { noop } from 'lodash';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import useIsTradeIn from '../../../../hooks/useIsTradeIn';
import { FormField } from '../../../../interfaces.d';
import { UseForm } from '../componentInterfaces.d';
import BankNameInput from '../forminputs/BankNameInput';
import HasAccidentInput from '../forminputs/HasAccidentInput';
import LienholderInput from '../forminputs/LienholderInput';
import RepairedDamageInput from '../forminputs/RepairedDamageInput';
import StateOfPurchaseInput from '../forminputs/StateOfPurchaseInput';
import TitleStatusInput from '../forminputs/TitleStatusInput';

interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
}

const VehicleHistory: React.FC<Props> = ({ fields }) => {
  const lienholderRef = useRef<string>();
  const hasAccidentRef = useRef<string>();
  const isTradeIn = useIsTradeIn();

  useEffect(() => {
    if (lienholderRef.current !== fields.lienType.value) {
      lienholderRef.current = fields.lienType.value;

      fields.bankName.onChange({
        ...fields.bankName,
        isRequired: !isTradeIn && fields.lienType.value !== 'Neither',
        value: fields.lienType.value === 'Neither' ? '' : fields.bankName.value,
      });
    }
  }, [fields.lienType.value, fields.bankName, isTradeIn]);

  useEffect(() => {
    if (hasAccidentRef.current !== fields.hasAccident.value) {
      hasAccidentRef.current = fields.hasAccident.value;

      fields.repairedAfterAccident.onChange({
        ...fields.repairedAfterAccident,
        isRequired: fields.hasAccident.value === 'Yes',
        value:
          fields.hasAccident.value === 'Yes'
            ? fields.repairedAfterAccident.value
            : '',
      });
    }
  }, [fields.hasAccident.value, fields.repairedAfterAccident]);

  return (
    <>
      <HasAccidentInput field={fields.hasAccident} />
      {fields.hasAccident.value === 'Yes' ? (
        <RepairedDamageInput field={fields.repairedAfterAccident} />
      ) : null}
      {isTradeIn && (
        <StateOfPurchaseInput field={fields.state} onKeyPressEnter={noop} />
      )}
      <TitleStatusInput field={fields.titleStatus} />
      {!isTradeIn && (
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

export default VehicleHistory;
