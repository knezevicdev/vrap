import React from 'react';

import ViewModel from './ViewModel';
import styled from "styled-components";
import {Body, Title} from "vroom-ui/src/foundation/Typography";
import {ThemeProps} from "vroom-ui/src/foundation/themes/types";

interface Props {
  viewModel: ViewModel;
}
const grayThree = (props: { theme: ThemeProps }): string =>
    props.theme.colors.gray.three;

const Container = styled.div`
  display:flex;
  flex-direction: column;
`;

const Row = styled.div`
  display:flex;
  justify-content: space-between;
`;

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
`;

const Divider = styled.div`
    min-height: 1px;
    max-height: 1px;
    min-width: 100%;
    max-width: 100%;
    background: ${grayThree};
    margin: 16px 0;
`

const View: React.FC<Props> = () => {
  return (
      <Container>
        <Title.One>Financing information</Title.One>
        <Row>
          <Body.Regular>Downpayment</Body.Regular>
          <BodyRegularBold>-$5,000.00</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Financing Bank</Body.Regular>
          <BodyRegularBold>Chase</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>APR</Body.Regular>
          <BodyRegularBold>TBD</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Finance Term</Body.Regular>
          <BodyRegularBold>TBD</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Number of payments</Body.Regular>
          <BodyRegularBold>TBD</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Finance charge</Body.Regular>
          <BodyRegularBold>TBD</BodyRegularBold>
        </Row>
        <Divider/>
        <Row>
          <Title.Two>Monthly payment</Title.Two>
          <Title.Two>$287.00</Title.Two>
        </Row>
      </Container>
  );
};

export default View;
