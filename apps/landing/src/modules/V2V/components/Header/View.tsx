import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../../../core/Icon';
import VehicleDetailsButton from '../VehicleDetailsButton';
import HeaderViewModel from './ViewModel';

import { Link, Title } from 'src/core/Typography';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  max-height: 64px;
  background: #ffffff;
  box-shadow: 0px 6px 6px -6px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1;

  @media (min-width: 840px) {
    min-height: 72px;
    max-height: 72px;
    padding: 0 32px;
  }

  @media (min-width: 600px) and (max-width: 839px) {
    padding: 0 24px;
  }

  @media (max-width: 599px) {
    position: relative;
    padding: 0 16px;
  }
`;

const VehicleContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 839px) {
    display: none;
  }
`;

const YearMakeModel = styled(Title.One)`
  line-height: 40px;
`;

const Divider = styled.div`
  height: 32px;
  width: 1px;
  background-color: #999da3;
  margin: 0px 16px;
`;

const Price = styled(Title.One)`
  line-height: 40px;
  margin-right: 32px;
`;

interface Props {
  viewModel: HeaderViewModel;
}

const HeaderView: React.FC<Props> = ({ viewModel }) => {
  const { logoHref } = viewModel;

  return (
    <Container>
      <Link href={logoHref}>
        <Icon icon={Icons.VROOM} />
      </Link>
      {viewModel.hasCar() && viewModel.getSticky() && (
        <VehicleContainer>
          <YearMakeModel>{viewModel.details().ymm}</YearMakeModel>
          <Divider />
          <Price>{viewModel.details().price}</Price>
          <div>
            <VehicleDetailsButton />
          </div>
        </VehicleContainer>
      )}
    </Container>
  );
};

export default observer(HeaderView);
