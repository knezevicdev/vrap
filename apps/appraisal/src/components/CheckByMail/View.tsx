import React from 'react';
import styled from 'styled-components';

import CheckByMailViewModel from './ViewModel';
import IsPrimaryAddress from 'src/components/IsPrimaryAddress';

import { Body } from 'src/core/Typography';
import { MailingAddress } from 'src/interfaces.d';

interface Props {
  mailingAddress: MailingAddress;
  isPrimaryAddress: string;
  viewModel: CheckByMailViewModel;
}

const CBMContainer = styled.div`
  width: 100%;
`;

const CBMMessage = styled(Body.Regular)`
  display: flex;
  padding: 25px 0 10px;
`;

const CBMMailingAddress = styled(Body.Regular)`
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
`;

const AddressLine = styled.span`
  display: flex;
`;

const CheckByMailView: React.FC<Props> = ({ mailingAddress, isPrimaryAddress, viewModel }) => {
  return (
    <CBMContainer>
      <CBMMessage>{viewModel.mailingAddressMsg}</CBMMessage>
      <CBMMailingAddress className="fs-mask">
        <AddressLine>{mailingAddress['address_1']}</AddressLine>
        <AddressLine>
          {mailingAddress.city} {mailingAddress.state} {mailingAddress.zipcode}
        </AddressLine>
      </CBMMailingAddress>

      <IsPrimaryAddress selected={isPrimaryAddress} />
    </CBMContainer>
  );
};

export default CheckByMailView;
