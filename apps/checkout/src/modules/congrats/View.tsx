import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import {
    footerViewModel,
    nextViewModel,
    purchaseSummaryViewModel,
    questionsViewModel,
    reservedCarViewModel
} from '../../stories/pages/congrats/ViewModels';
import Questions from './sections/Questions';
import ReservedCar from "./sections/ReservedCar";
import Next from "./sections/Next";
import PurchaseSummary from "./sections/PurchaseSummary/PurchaseSummary";
import {Footer} from "vroom-ui";

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const CongratsView: React.FC = () => {
  return (
    <Page>
        <ReservedCar {...reservedCarViewModel} />
        <Next {...nextViewModel} />
        <PurchaseSummary {...purchaseSummaryViewModel} />
        <Questions {...questionsViewModel} />
        <Footer sections={footerViewModel.sections} />
    </Page>
  );
};

export default observer(CongratsView);
