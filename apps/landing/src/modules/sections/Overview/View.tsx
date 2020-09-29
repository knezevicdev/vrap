import React from 'react';
import styled from 'styled-components';

import Icon from '../../../core/Icon';
import { Body, Hero, Title } from '../../../core/Typography';
import OverviewViewModel from './ViewModel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;

  @media (min-width: 600px) and (max-width: 839px) {
    margin-left: 64px;
    margin-right: 64px;
  }

  @media (max-width: 599px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const Content = styled(Body.Regular)`
  @media (min-width: 600px) {
    margin-top: 32px;
  }

  @media (max-width: 599px) {
    margin-top: 16px;
  }
`;

const Details = styled.div`
  display: flex;
  width: 50%;

  @media (min-width: 600px) and (max-width: 839px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 599px) {
    width: 100%;
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media (min-width: 600px) {
    &:not(:last-child) {
      margin-right: 64px;
    }
  }

  @media (max-width: 599px) {
    :nth-child(2) {
      margin-right: auto;
      margin-left: auto;
    }
  }
`;

const Description = styled(Body.Small)`
  color: #6c717a;
`;

interface Props {
  viewModel: OverviewViewModel;
}

const OverviewView: React.FC<Props> = ({ viewModel }) => {
  const { sectionTitle, details, content } = viewModel;
  return (
    <Container>
      <Hero.Four>{sectionTitle}</Hero.Four>
      <Info>
        <Details>
          {details.map((detail) => {
            const { icon, title, description } = detail;
            return (
              <Detail key={title}>
                <Icon icon={icon} />
                <Title.Two>{title}</Title.Two>
                <Description>{description}</Description>
              </Detail>
            );
          })}
        </Details>
        <Content>{content}</Content>
      </Info>
    </Container>
  );
};

export default OverviewView;
