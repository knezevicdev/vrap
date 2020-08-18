import React from 'react';
import styled, { css } from 'styled-components';

import { ThemeProps } from '../themes/types';

interface Props {
  theme: ThemeProps;
}

const heroFamily = ({ theme }: Props): string => theme.typography.family.hero;
const titleFamily = ({ theme }: Props): string => theme.typography.family.title;
const bodyFamily = ({ theme }: Props): string => theme.typography.family.body;
const color = ({ theme }: Props): string => theme.typography.color;

const heroBase = css`
  margin: 0;
  font-family: ${heroFamily};
  font-weight: normal;
  letter-spacing: 1px;
  color: ${color};
`;

const titleBase = css`
  font-family: ${titleFamily};
  font-weight: 600;
  letter-spacing: 0.25px;
  color: ${color};
`;

const bodyBase = css`
  font-family: ${bodyFamily};
  font-weight: normal;
  letter-spacing: 0.25px;
  color: ${color};
`;

const Hero1 = styled.h1`
  ${heroBase}
  font-size: 62px;
  line-height: 72px;
`;

const Hero2 = styled.h2`
  ${heroBase}
  font-size: 42px;
  line-height: 64px;
`;

const Hero3 = styled.h3`
  ${heroBase}
  font-size: 36px;
  line-height: 40px;
`;

const Hero4 = styled.h4`
  ${heroBase}
  font-size: 30px;
  line-height: 40px;
`;

const Title1 = styled.span`
  ${titleBase}
  font-size: 28px;
  line-height: 32px;
`;

const Title2 = styled.span`
  ${titleBase}
  font-size: 24px;
  line-height: 32px;
`;

const Title3 = styled.span`
  ${titleBase}
  font-size: 20px;
  line-height: 32px;
`;

const BodyRegular = styled.span`
  ${bodyBase}
  font-size: 18px;
  line-height: 24px;
`;

const BodySmall = styled.span`
  ${bodyBase}
  font-size: 14px;
  line-height: 20px;
`;

const BodyFine = styled.span`
  ${bodyBase}
  font-size: 10px;
  line-height: 16px;
`;

export class Hero {
  static One = Hero1;
  static Two = Hero2;
  static Three = Hero3;
  static Four = Hero4;
}

export class Title {
  static One = Title1;
  static Two = Title2;
  static Three = Title3;
}

export class Body {
  static Regular = BodyRegular;
  static Small = BodySmall;
  static Fine = BodyFine;
}

interface LinkProps {
  className?: string;
  children: string;
  href: string;
  blank?: boolean;
}

const A = styled.a`
  ${bodyBase}
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Link: React.FC<LinkProps> = ({
  className,
  children,
  href,
  blank,
}) => {
  const target = (blank && '_blank') || undefined;
  return (
    <A className={className} href={href} target={target}>
      {children}
    </A>
  );
};
