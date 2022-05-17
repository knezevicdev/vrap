import styled from 'styled-components';

import { ResponsiveProp, responsiveStyledProp } from './responsiveProp';

interface RowProps {
  direction?: ResponsiveProp<
    'row' | 'row-reverse' | 'column' | 'column-reverse'
  >;
  wrap?: ResponsiveProp<'nowrap' | 'wrap' | 'wrap-reverse'>;
  justify?: ResponsiveProp<
    'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  >;
  align?: ResponsiveProp<
    'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  >;
  gap?: ResponsiveProp<string>;
}

export const Row = styled.div<RowProps>`
  display: flex;

  ${({ direction, wrap, justify, align, gap }) => `
    ${responsiveStyledProp('flex-direction', direction)}
    ${responsiveStyledProp('flex-wrap', wrap)}
    ${responsiveStyledProp('justify-content', justify)}
    ${responsiveStyledProp('align-items', align)}
    ${responsiveStyledProp('--gap', gap)}
  `}
`;

const width = (size: ResponsiveProp<number> = 1, disableBottomGap = false) => {
  if (typeof size === 'number')
    return `
      flex-basis: calc(${100 * size}% - var(--gap));
      max-width: calc(${100 * size}% - var(--gap));
      margin-right: var(--gap);
      ${disableBottomGap ? '' : 'margin-bottom: var(--gap);'}
    `;

  const percentagedSize = Object.fromEntries(
    Object.entries(size).map(([key, val]) => [
      key,
      `calc(${100 * val}% - var(--gap))`,
    ])
  );

  return `
    ${responsiveStyledProp('flex-basis', percentagedSize)}
    ${responsiveStyledProp('max-width', percentagedSize)}
    ${responsiveStyledProp('margin-right', 'var(--gap)')}
    ${
      disableBottomGap
        ? ''
        : responsiveStyledProp('margin-bottom', 'var(--gap)')
    }
  `;
};

interface ColProps {
  display?: ResponsiveProp<
    'flex' | 'inline-flex' | 'block' | 'none' | 'inline-block'
  >;
  alignSelf?: ResponsiveProp<
    'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  >;
  size?: ResponsiveProp<number>;
  disableBottomGap?: boolean;
}

export const Col = styled.div<ColProps>`
  ${({ display, alignSelf, size, disableBottomGap }) => `
    ${responsiveStyledProp('display', display)}
    ${responsiveStyledProp('align-self', alignSelf)}
    ${width(size, disableBottomGap)}
  `}
`;
