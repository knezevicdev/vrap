import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { Hero } from 'src/core/Typography';
import Store from 'src/store';
import { displayCurrency } from 'src/utils';

interface Props {
  viewModel: ViewModel;
  priceId: string;
  store: Store;
}

const TransactionOverviewView: React.FC<Props> = ({
  viewModel,
  priceId,
  store,
}) => {
  const { offerDetail, loading } = store.offer;

  useEffect(() => {
    viewModel.getOfferDetail(priceId);
  }, [priceId]);

  return (
    <InfoContainer data-qa="OfferInfoCardContainer">
      <InfoTitle>
        <InfoTitleText>{viewModel.title}</InfoTitleText>
      </InfoTitle>
      {!loading && (
        <InfoContent>
          <VehicleInfo>
            {offerDetail?.year} {offerDetail?.make} {offerDetail?.model}
          </VehicleInfo>
          <VehicleTrim>
            {offerDetail?.trim} | {offerDetail?.miles}
          </VehicleTrim>
          <VehicleTrim>
            Your Price: {displayCurrency(offerDetail?.price)}
          </VehicleTrim>
        </InfoContent>
      )}
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;
  border-radius: 0;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #d6d7da;
  padding: 20px;
  @media (max-width: 1020px) {
    max-width: calc(100% - 20px);
    margin: 0 10px;
  }
  @media (max-width: 720px) {
    max-width: 100%;
    margin: 0;
  }
`;

const InfoTitle = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid #d6d7da;
`;

const InfoTitleText = styled(Hero.Five)`
  font-style: italic;
  font-weight: 800;
  letter-spacing: 1px;
  color: #041022;
  min-height: 30px;
  margin-bottom: 2px;
`;

const InfoContent = styled.div`
  padding-top: 15px;
`;

const VehicleInfo = styled.div`
  font-family: 'Calibre';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: #041022;
`;

const VehicleTrim = styled(VehicleInfo)`
  font-weight: normal;
  line-height: 26px;
  letter-spacing: 0.25px;
`;

export default observer(TransactionOverviewView);
