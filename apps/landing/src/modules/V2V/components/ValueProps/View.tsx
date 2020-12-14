import React, { FC } from 'react';
import styled from 'styled-components';

import ValuePropsViewModel from './ViewModel';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 864px;
  margin: 96px auto;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 0 16px;
    margin: 32px auto;
    margin-bottom: 128px;
  }
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
        {viewModel.sectionOrder.map((sectionSlug, idx) => {
          const Component = viewModel.sectionMap[sectionSlug];
          if (Component) return <Component key={idx} />;
        })}
      </Container>
    </Background>
  );
};

export default ValuePropsView;
