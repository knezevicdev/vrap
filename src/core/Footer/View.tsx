import { VroomFooter } from '@vroom-web/shared-components';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ hasOverlay: boolean }>`
  ${(props): any => (props.hasOverlay === true ? 'padding-bottom: 180px' : '')};
`;

interface Props {
  hasOverlay: boolean;
}

const FooterView: React.FC<Props> = ({ hasOverlay }) => {
  return (
    <Container hasOverlay={hasOverlay}>
      <VroomFooter />
    </Container>
  );
};

export default FooterView;
