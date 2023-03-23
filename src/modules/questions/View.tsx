import { Icon, Link } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import QuestionsViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';
import { Hero, Title } from 'src/core/Typography';

export interface Props {
  viewModel: QuestionsViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <div>
      <StyledHero>{viewModel.questions}</StyledHero>
      <StyledContainer>
        <IconSection>
          <Icon icon={Icons.FAQ} />
          <StyledLink href={viewModel.faqLink}>
            <StyledTitle>{viewModel.helpCenter}</StyledTitle>
          </StyledLink>
        </IconSection>
        <VerticalDivider />
        <IconSection>
          <Icon icon={Icons.EMAIL} />
          <StyledLink href={viewModel.emailLink}>
            <StyledTitle>{viewModel.sendMessage}</StyledTitle>
          </StyledLink>
        </IconSection>
        <VerticalDivider />
        <IconSection>
          <Icon icon={Icons.PHONE} />
          <StyledLink href={viewModel.phoneLink}>
            <StyledTitle>{viewModel.phoneNumber}</StyledTitle>
          </StyledLink>
        </IconSection>
      </StyledContainer>
    </div>
  );
};

const StyledLink = styled(Link.Text)`
  text-decoration: none;

  :hover {
    text-decoration-color: red;
  }
`;

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 40px 0;

  @media (max-width: 599px) {
    flex-direction: column;
  }
`;

const StyledTitle = styled(Title.Four)`
  padding: 10px;
`;

const StyledHero = styled(Hero.Three)`
  padding-top: 40px;
  text-align: center;
`;

const IconSection = styled.div`
  align-items: center;
  display: flex;
  padding: 0 30px;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #d6d7da;
  margin: 0 20px;

  @media (max-width: 599px) {
    display: none;
  }
`;

export default observer(View);
