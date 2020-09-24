import React from 'react';
import styled from 'styled-components';

import { Button } from '../../core/Button';
import Icon, { Icons } from '../../core/Icon';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  max-height: 64px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 6px 6px -6px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1;

  @media (min-width: 840px) {
    min-height: 72px;
    max-height: 72px;
  }
`;

const Logo = styled(Icon)`
  margin-left: 24px;
`;

export const Header: React.FC = () => {
  const onClick = (): void => {
    alert('clicked');
  };
  return (
    <Container>
      <Logo icon={Icons.VROOM} />
      <Button.Primary onClick={onClick}>FIND YOURS</Button.Primary>
    </Container>
  );
};
