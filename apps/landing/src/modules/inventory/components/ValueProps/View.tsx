import React, { FC } from 'react';
import styled from 'styled-components';

import ValuePropsViewModel from './ViewModel';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 864px;
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 96px;
`;

const Background = styled.div`
  background-color: #fff;
`;

interface Props {
  viewModel: ValuePropsViewModel;
}

const ValuePropsView: FC<Props> = ({ viewModel }) => {
  return (
    <Background>
      <Container>
        {viewModel.sectionOrder.map((sectionSlug) => {
          const Component = viewModel.sectionMap[sectionSlug];
          if (Component) return <Component />;
        })}
      </Container>
    </Background>
  );
};

export default ValuePropsView;
