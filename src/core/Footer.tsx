import { VroomFooter } from '@vroom-web/shared-components';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ hasOverlay: boolean }>`
  margin-top: auto;
  ${(props): any => (props.hasOverlay === true ? 'padding-bottom: 180px' : '')};
`;

interface Props {
  hasOverlay?: boolean;
}

const Footer: React.FC<Props> = ({ hasOverlay = false }) => {
  return (
    <Container hasOverlay={hasOverlay}>
      <VroomFooter />
    </Container>
  );
};

export default Footer;
