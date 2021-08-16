import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import FormikInput from 'src/core/FormikInput';

const DirectDepositContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const RoutingNumber = styled(FormikInput)`
  width: 100%;
  > label {
    font-family: Calibre;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
  > input {
    border: 1px solid #999da3;
    height: 48px;
  }
`;

const AccountNumber = styled(FormikInput)`
  width: 100%;
  > label {
    font-family: Calibre;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
  > input {
    border: 1px solid #999da3;
    height: 48px;
  }
`;

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  return (
    <DirectDepositContainer>
      <RoutingNumber
        id="routingNumber"
        name={'routingNumber'}
        className="fs-mask"
        label={viewModel.routingLabel}
        placeholder={viewModel.routingLabel}
        fluid={true}
        maxLength={9}
      />
      <AccountNumber
        id="bankAccountNumber"
        name={'bankAccountNumber'}
        className="fs-mask"
        label={viewModel.bankAccountLabel}
        placeholder={viewModel.bankAccountLabel}
        fluid={true}
        maxLength={17}
      />
    </DirectDepositContainer>
  );
};

export default DirectDepositView;
