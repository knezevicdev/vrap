import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const TransactionOverviewView: React.FC<Props> = ({ viewModel }) => {
  return (
    <InfoContainer data-qa="OfferInfoCardContainer">
      <InfoTitle>{viewModel.title}</InfoTitle>
      <InfoContent>
        <VehicleInfo></VehicleInfo>
        <VehicleTrim></VehicleTrim>
        <OfferPrice></OfferPrice>
      </InfoContent>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #d6d7da;
  padding: 20px;
`;

const InfoTitle = styled.div`
  font-size: 28px;
  line-height: 32px;
  letter-spacing: 1px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d6d7da;
`;

const InfoContent = styled.div``;

const VehicleInfo = styled.div`
  font-family: 'Calibre-Semibold';
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
`;

const VehicleTrim = styled.div`
  font-family: 'Calibre-Regular';
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.25px;
`;

const OfferPrice = styled.div`
  font-family: 'Calibre-Semibold';
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
`;

export default TransactionOverviewView;
