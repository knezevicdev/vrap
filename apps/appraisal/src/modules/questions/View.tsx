import Icon, { Icons } from 'src/core/Icon';
import QuestionsViewModel from './ViewModel';
import React from 'react';
import styled from 'styled-components';
import { Body, Hero, Title } from 'src/core/Typography';

export interface Props {
  viewModel: QuestionsViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <>
      <StyledHero>{viewModel.questions}</StyledHero>
			<StyledContainer>
				<IconSection>
					<Icon icon={Icons.FAQ} />
					<StyledTitle>{viewModel.helpCenter}</StyledTitle>
				</IconSection>
          <VerticalDivider /> 
        <IconSection>
          <Icon icon={Icons.EMAIL} />
          <StyledTitle>{viewModel.sendMessage}</StyledTitle>
        </IconSection>
				<VerticalDivider /> 
        <IconSection>
          <Icon icon={Icons.PHONE} />
          <StyledTitle>{viewModel.phoneNumber}</StyledTitle>
        </IconSection>
			</StyledContainer>
    </>
  );
};

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


export default View;
