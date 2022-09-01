import { addStyleForMobile } from '@vroom-web/ui-lib';
import { noop } from 'lodash';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useAppStore } from '../../../../context';
import { FormField } from '../../../../interfaces.d';
import { UseForm } from '../componentInterfaces.d';
import BankNameInput from '../forminputs/BankNameInput';
import HasAccidentInput from '../forminputs/HasAccidentInput';
import LienholderInput from '../forminputs/LienholderInput';
import StateOfPurchaseInput from '../forminputs/StateOfPurchaseInput';
import TitleStatusInput from '../forminputs/TitleStatusInput';

interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
}

const VehicleHistoryView: React.FC<Props> = ({ fields, form }) => {
  const lienholderRef = useRef<string>();
  const isTradeInRef = useRef<boolean>();
  const { store } = useAppStore();
  const { isTradeIn } = store.appraisal;

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
    if (isTradeInRef.current !== isTradeIn) {
      isTradeInRef.current = isTradeIn;

      form.updateMultipleFields({
        lienType: {
          ...fields.lienType,
          isRequired: !isTradeIn,
        },
        bankName: {
          ...fields.bankName,
          isRequired: !isTradeIn && fields.lienType.value !== 'Neither',
        },
        state: {
          ...fields.state,
          isRequired: isTradeIn,
        },
      });
    }
  }, [fields.bankName, fields.lienType, fields.state, form, isTradeIn]);

  return (
    <>
      <HasAccidentInput field={fields.hasAccident} />
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

export default VehicleHistoryView;
