import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import { Heading, Typography, ThemeProps, Icon, Icons } from '@vroom-web/temp-ui-alias-for-checkout'
//import Trade from "./components/Trade";
import VehicleTradeInViewModel from './ViewModel';

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Page = styled.div`
  display: grid;
  justify-items: center;
  padding-top: 62px;
  padding-bottom: 65px;
  row-gap: 8px;
  grid-template-rows: 40px 24px 148px 48px 48px;
`;

const SubTitle = styled(Typography.Body.Regular)`
   display: grid;
   grid-template-columns: auto 16px;
   grid-gap: 8px;
   align-items: center;
`;

interface Props {
  viewModel: VehicleTradeInViewModel;
}

const VehicleTradeInView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Page> 
      <Heading.Three>your trade-in information</Heading.Three>
      <SubTitle>Start by entering your license plate or VIN <Icon icon={Icons.FEEDBACK_QUESTION} /></SubTitle>
      {/* <Trade/>  */}
      <div>Continue</div>
      <div>back</div>
    </Page>
  );
};

export default observer(VehicleTradeInView);
