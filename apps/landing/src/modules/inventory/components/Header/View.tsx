import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../../../core/Icon';
import HeaderViewModel from './ViewModel';

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

interface Props {
  viewModel: HeaderViewModel;
}

const HeaderView: React.FC<Props> = ({ viewModel }) => {
  const { logoHref } = viewModel;
  return (
    <Container>
      <a href={logoHref}>
        <Icon icon={Icons.VROOM} />
      </a>
    </Container>
  );
};

export default HeaderView;
