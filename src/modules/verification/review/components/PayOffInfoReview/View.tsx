import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Store from 'src/store';
import { displaySecureSSN } from 'src/utils';
interface Props {
  viewModel: ViewModel;
  store: Store;
}

interface Props {
  viewModel: ViewModel;
  store: Store;
}

const PayoffInfoReview: React.FC<Props> = ({ viewModel, store }) => {
  const { verificationDetail } = store.verification;
  return (
    <>
      <Subtitle>
        {viewModel.payOfftitle} <Edit onClick={() => console.log(3)}>Edit</Edit>
      </Subtitle>

      <Row>
        <Info>
          <Label>{viewModel.carPayment}</Label>
          <Field>{verificationDetail?.current_payments ? 'Yes' : 'No'}</Field>
        </Info>
        <Info>
          <Label>{viewModel.whereCarPayment}</Label>
          <Field>{verificationDetail?.lien_financial_institution_name}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>{viewModel.loanAccountNumber}</Label>
          <Field>{verificationDetail?.lien_account_number}</Field>
        </Info>
        <Info>
          <Label>{viewModel.ssnLastFour}</Label>
          <Field>{displaySecureSSN(verificationDetail?.last_four_ssn)}</Field>
        </Info>
      </Row>
    </>
  );
};

const Subtitle = styled.h2`
  /* ${(props) => props.theme.typography.sectionTitleSemi3} */
  text-align: left;
`;

// const SectionTitle = styled.h3`
//   ${(props) => props.theme.typography.supportTextBold}
//   text-align: left;
//   margin: 20px 0;
// `;

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  /* ${(props) => props.theme.media.lte('mobile')} {
    flex-direction: column;
    margin-bottom: 0;
  } */
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  /* ${(props) => props.theme.media.lte('mobile')} {
    width: 100%;
    padding-bottom: 10px;
  } */
`;

const Label = styled.span`
  /* ${(props) => props.theme.typography.h14()}
  color: ${(props) => props.theme.colors.dark}; */
`;

const Field = styled.span`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.25px;
`;

const Edit = styled.span`
  /* ${(props) => props.theme.typography.h10()}
  color: ${(props) => props.theme.colors.vroomRed}; */
  cursor: pointer;
`;

export default observer(PayoffInfoReview);
