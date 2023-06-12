import { Icon } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';

import {
  IconSection,
  StyledContainer,
  StyledHero,
  StyledLink,
  StyledTitle,
  VerticalDivider,
} from './Style.css';

import { Icons } from 'src/core/Icon';

const Questions = () => {
  return (
    <div>
      <StyledHero id="faq">Questions?</StyledHero>
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

export default observer(Questions);
