import React from 'react';
import styled from 'styled-components';

import CheckByMailViewModel from './ViewModel';

import { Body } from 'src/core/Typography';
import { MailingAddress } from 'src/interfaces.d';

interface Props {
  mailingAddress: MailingAddress;
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

const CheckByMailView: React.FC<Props> = ({ mailingAddress, viewModel }) => {
  return (
    <CBMContainer>
      <CBMMessage>{viewModel.mailingAddressMsg}</CBMMessage>
      <CBMMailingAddress>
        <AddressLine>{mailingAddress['address_1']}</AddressLine>
        <AddressLine>
          {mailingAddress.city} {mailingAddress.state} {mailingAddress.zipcode}
        </AddressLine>
      </CBMMailingAddress>
    </CBMContainer>
  );
};

export default CheckByMailView;
