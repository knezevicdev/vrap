import React, { FC } from 'react';
import styled from 'styled-components';

import { ButtonSection } from './Sections';
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
  console.log({ viewModel });
  return (
    <Background>
      <Container>
        {viewModel.sectionOrder.map((sectionSlug, idx) => {
          const validSection = viewModel.sectionMap[sectionSlug];
          const Component = validSection && validSection.component;
          if (Component) return <Component key={idx} />;
        })}
        <ButtonSection />
      </Container>
    </Background>
  );
};

export default ValuePropsView;
