import { Logo } from '@vroom-web/legacy-header-components';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';

interface Prop {
  viewModel: ViewModel;
}

const PaymentHeaderView: React.FC<Prop> = ({ viewModel }) => {
  return (
    <HeaderContainer>
      <Logo />
      <div>
        <MobileIcon href={'tel:+18325383550'}>
          <Icon icon={Icons.CALL_US} />
        </MobileIcon>
        <HeaderText>{viewModel.callUs}</HeaderText>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 32px;
  align-items: center;
  height: 72px;
  @media (max-width: 420px) {
    height: 56px;
    margin: 0 24px;
  }
`;

const HeaderText = styled.div`
  font-family: Calibre;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  @media (max-width: 425px) {
    display: none;
  }
`;

const MobileIcon = styled.a`
  color: inherit;
  text-decoration: none;
  img {
    width: 18px;
    height: 18px;
  }
  @media (min-width: 425px) {
    display: none;
  }
`;
export default PaymentHeaderView;
