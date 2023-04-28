import { Icon, Link, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import { Icons } from 'src/core/Icon';

const View = () => {
  return (
    <div>
      <StyledHero>Questions?</StyledHero>
      <StyledContainer>
        <IconSection>
          <Icon icon={Icons.FAQ} />
          <StyledLink href="/contact">
            <StyledTitle>VISIT OUR HELP CENTER</StyledTitle>
          </StyledLink>
        </IconSection>
        <VerticalDivider />
        <IconSection>
          <Icon icon={Icons.EMAIL} />
          <StyledLink href="/contact">
            <StyledTitle>SEND A MESSAGE</StyledTitle>
          </StyledLink>
        </IconSection>
        <VerticalDivider />
        <IconSection>
          <Icon icon={Icons.PHONE} />
          <StyledLink href="tel:1-(855)-524-1300">
            <StyledTitle>(855) 524-1300</StyledTitle>
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

const StyledTitle = styled(Typography.Title.Three)`
  font-size: 16px;
  padding: 10px;
`;

const StyledHero = styled(Typography.Heading.Three)`
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
