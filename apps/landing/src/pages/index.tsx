import React from 'react';

import { Body, Hero, Link, Title } from 'src/core/Typography';

const Landing = () => {
  return (
    <>
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
    </>
  );
};

export default Landing;
