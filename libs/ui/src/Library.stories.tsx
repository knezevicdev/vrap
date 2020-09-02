import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Button } from './atoms/Button';
import { Picture } from './atoms/Picture';
import { Body, Hero, Link, Title } from './atoms/Typography';
import { theme as SantanderTheme } from './themes/New/Santander';
import { theme as VroomTheme } from './themes/New/Vroom';

export default { title: 'Atoms' };

const Container = styled.div`
  display: flex;
`;

const Client = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-right: solid 1px #d6d7da;
  padding-left: 16px;
  padding-right: 16px;
`;

const SectionTitle = styled(Title.One)`
  margin: 16px 0;
  border-bottom: solid 1px #d6d7da;
  padding-bottom: 16px;
  color: #e7131a;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CustomLink = styled(Link)`
  font-size: 22px;
  font-weight: 600;
  color: red;
`;

const CustomPrimary = styled(Button.Primary)`
  width: 100%;
  max-height: 52px;
  height: 52px;
`;

const Typography = (): JSX.Element => {
  return (
    <SectionContainer>
      <SectionTitle>Typography</SectionTitle>
      <Hero.One>hero h1</Hero.One>
      <Hero.Two>hero h2</Hero.Two>
      <Hero.Three>hero h3</Hero.Three>
      <Hero.Four>hero h4</Hero.Four>
      <Title.One>Title 1</Title.One>
      <Title.Two>Title 2</Title.Two>
      <Title.Three>Title 3</Title.Three>
      <Body.Regular>Body regular</Body.Regular>
      <Body.Small>Body small</Body.Small>
      <Body.Fine>Body fine</Body.Fine>
      <Link href="https://www.vroom.com/">Vroom.com Link</Link>
      <CustomLink href="https://www.vroom.com/" blank>
        Custom Vroom.com Link opens in new tab
      </CustomLink>
    </SectionContainer>
  );
};

const Buttons = (): JSX.Element => {
  const onClick = (): void => {
    alert('clicked');
  };
  return (
    <SectionContainer>
      <SectionTitle>Buttons</SectionTitle>
      <Button.Primary onClick={onClick}>Primary</Button.Primary>
      <Button.Secondary onClick={onClick}>Secondary</Button.Secondary>
      <Button.Bare onClick={onClick}>Bare</Button.Bare>
      <Button.Outline onClick={onClick}>Outline</Button.Outline>
      <CustomPrimary onClick={onClick}>Custom Primary</CustomPrimary>
      <Button.Primary disabled onClick={onClick}>
        Primary
      </Button.Primary>
      <Button.Secondary disabled onClick={onClick}>
        Secondary
      </Button.Secondary>
      <Button.Bare disabled onClick={onClick}>
        Bare
      </Button.Bare>
      <Button.Outline disabled onClick={onClick}>
        Outline
      </Button.Outline>
      <CustomPrimary disabled onClick={onClick}>
        Custom Primary
      </CustomPrimary>
    </SectionContainer>
  );
};

const Pictures = (): JSX.Element => {
  return (
    <SectionContainer>
      <SectionTitle>Pictures</SectionTitle>
      <Picture
        alt="Vroom Logo"
        src="/images/vroom-main-logo-116x20.png"
        width="116"
        height="20"
      />
      <Picture
        alt="Ford F-150"
        src="/images/ford.png"
        width="50%"
        aspectRatio="543:292"
      />
      <Picture
        alt="Prius"
        src="/images/prius.png"
        width="150px"
        aspectRatio="1199:432"
      />
      <Picture
        alt="Where is VIN"
        src="/images/where-is-vin.png"
        width="150"
        aspectRatio="888:336"
      />
      <Picture
        alt="Customer Quote"
        src="/images/customer-quote.png"
        width="100%"
        aspectRatio="592:395"
      />
      <Picture
        alt="Hero Background"
        src="/images/hero-background.png"
        width="auto"
        aspectRatio="1280:496"
      />
      <Picture
        alt="Who We Are Background"
        src="/images/who-we-are-background.png"
        width="auto"
        height="300px"
        objectFit="cover"
        objectPosition="25% 25%"
      />
      <Picture
        alt="Who We Are Background"
        src="/images/who-we-are-background.png"
        width="auto"
        height="300px"
        objectFit="contain"
      />
    </SectionContainer>
  );
};

export const Atoms: React.FC = () => {
  return (
    <Container>
      <Client>
        <ThemeProvider theme={VroomTheme}>
          <Typography />
          <Buttons />
          <Pictures />
        </ThemeProvider>
      </Client>
      <Client>
        <ThemeProvider theme={SantanderTheme}>
          <Typography />
          <Buttons />
        </ThemeProvider>
      </Client>
    </Container>
  );
};
