import React from 'react';
import styled from 'styled-components';

import { Button } from '../../atoms/Button';
import Icon, { Icons } from '../../atoms/Icon/Icon';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  max-height: 56px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 6px 6px -6px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1;
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
      <Button.Bare onClick={onClick}>FIND YOURS</Button.Bare>
    </Container>
  );
};
