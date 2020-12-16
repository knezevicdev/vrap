import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import { Footer } from 'vroom-ui';

//import { purchaseSummaryViewModel } from '../../stories/pages/congrats/ViewModels';
import Next from './sections/Next';
import PurchaseSummary from './sections/PurchaseSummary/PurchaseSummary';
import Questions from './sections/Questions';
import ReservedCar from './sections/ReservedCar';
import CongratsViewModel from './ViewModel';

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  viewModel: CongratsViewModel;
}

const CongratsView: React.FC<Props> = ({ viewModel }) => {
  if (viewModel.loading) {
    return <p>Loading...</p>;
  }
  if (viewModel.error) {
    return <p>Error!</p>;
  }
  if (viewModel.empty) {
    return <p>Empty!</p>;
  }

  const reservedCarProps = viewModel.reservedCarProps;
  const nextProps = viewModel.nextProps;
  const questionsProps = viewModel.questionsProps;
  const { sections } = viewModel.footerProps;
  const purchaseSummaryViewModel = viewModel.purchaseSummaryProps;

  return (
    <Page>
      <ReservedCar {...reservedCarProps} />
      <Next {...nextProps} />
      <PurchaseSummary {...purchaseSummaryViewModel} />
      <Questions {...questionsProps} />
      <Footer sections={sections} />
    </Page>
  );
};

export default observer(CongratsView);
