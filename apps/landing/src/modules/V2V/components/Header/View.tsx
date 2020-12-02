import React, { useEffect, useState } from 'react';
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
  }

  @media (min-width: 840px) {
    padding: 0 32px;
  }

  @media (min-width: 600px) and (max-width: 839px) {
    padding: 0 24px;
  }

  @media (max-width: 599px) {
    padding: 0 16px;
  }
`;

const VehicleContainer = styled.div`
  display: flex;
  @media (max-width: 839px) {
    display: none;
  }
`;

const YearMakeModel = styled(Title.One)`
  padding-right: 16px;
  border-right: 1px solid #999da3;
  margin-right: 16px;
  line-height: 48px;
`;

const Price = styled(Title.One)`
  line-height: 48px;
  margin-right: 32px;
`;

interface Props {
  viewModel: HeaderViewModel;
}

const HeaderView: React.FC<Props> = ({ viewModel }) => {
  const { logoHref, pageThreshold } = viewModel;
  const [showVehicleContainer, setShowVehicleContainer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = (): void => {
        const pos = window.pageYOffset;
        pos > pageThreshold
          ? setShowVehicleContainer(true)
          : setShowVehicleContainer(false);
      };
    }
  }, [showVehicleContainer, pageThreshold]);

  return (
    <Container>
      <Link href={logoHref}>
        <Icon icon={Icons.VROOM} />
      </Link>
      {viewModel.hasCar() && (
        <VehicleContainer>
          {showVehicleContainer && (
            <>
              <YearMakeModel>{viewModel.details().ymm}</YearMakeModel>
              <Price>{viewModel.details().price}</Price>
              <div>
                <VehicleDetailsButton />
              </div>
            </>
          )}
        </VehicleContainer>
      )}
    </Container>
  );
};

export default HeaderView;
