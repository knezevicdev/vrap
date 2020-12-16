import React from 'react';
import styled, { css } from 'styled-components';

import { ThemeProps } from './themes/types';
import { addStyleForMobile, addStyleForTablet } from './themes/Vroom';

interface Props {
  theme: ThemeProps;
}

const headingFamily = ({ theme: { typography } }: Props): string =>
  typography.family.heading;
const titleFamily = ({ theme: { typography } }: Props): string =>
  typography.family.title;
const bodyFamily = ({ theme: { typography } }: Props): string =>
  typography.family.body;
const color = ({ theme: { typography } }: Props): string => typography.color;

const headingBase = css`
  margin: 0;
  font-family: ${headingFamily};
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

const Heading1 = styled.h1`
  ${headingBase}
  font-size: 62px;
  line-height: 72px;

  ${addStyleForTablet(`
    font-size: 42px;
    line-height: 64px;
  `)}

  ${addStyleForMobile(`
    font-size: 36px;
    line-height: 40px;
  `)}
`;

const Heading2 = styled.h2`
  ${headingBase}
  font-size: 42px;
  line-height: 64px;

  ${addStyleForMobile(`
    font-size: 36px;
    line-height: 40px;
  `)}
`;

const Heading3 = styled.h3`
  ${headingBase}
  font-size: 36px;
  line-height: 40px;
`;

const Heading4 = styled.h4`
  ${headingBase}
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

const BodyRegular = styled.span<{ bold?: boolean }>`
  ${bodyBase}
  font-size: 18px;
  line-height: 24px;
  ${({ bold }) => bold && 'font-weight: 600;'}
`;

const BodySmall = styled.span<{ bold?: boolean }>`
  ${bodyBase}
  font-size: 14px;
  line-height: 20px;
  ${({ bold }) => bold && 'font-weight: 600;'}
`;

export const Heading = {
  One: Heading1,
  Two: Heading2,
  Three: Heading3,
  Four: Heading4,
};

export const Title = {
  One: Title1,
  Two: Title2,
  Three: Title3,
};

export const Body = {
  Regular: BodyRegular,
  Small: BodySmall,
};

export const Fine = styled.span<{ bold?: boolean }>`
  ${bodyBase}
  font-size: 10px;
  line-height: 16px;
  ${({ bold }) => bold && 'font-weight: 600;'}
`;

export interface LinkProps {
  className?: string;
  children: string | JSX.Element;
  href: string;
  blank?: boolean;
}

const A = styled.a`
  ${bodyBase}
  font-size: 18px;
  line-height: 24px;
  text-decoration: underline;
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

const Typography = {
  Heading,
  Title,
  Body,
  Fine,
  Link,
};

export default Typography;
