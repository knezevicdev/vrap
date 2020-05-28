/* This component utilizes patterns established by the original MUI Typography component:
https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Typography/Typography.js
This extension was created to match our team's preferred usage of typography.

A "typography variant" is defined as:
A name referring to a specific html tag, a font-family,
and a set of font-sizes for all breakpoints
('xs', 'sm', 'md', 'lg' and 'xl').

All other typography-related styles are to be added separately.

This implementation allows the developer to provide a variant to specify tag, font-family and font-sizes,
and separate props to support the other styling properties. */

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import { Theme } from 'src/ui/theme';

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const useStyles = makeStyles((theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {
    margin: 0,
  },
  /* Styles applied to the root element if `variant="h1"`. */
  h1: theme.typography.h1,
  /* Styles applied to the root element if `variant="h2"`. */
  h2: theme.typography.h2,
  /* Styles applied to the root element if `variant="h3"`. */
  h3: theme.typography.h3,
  /* Styles applied to the root element if `variant="body1"`. */
  body1: theme.typography.body1,
  /* Styles applied to the root element if `variant="button"`. */
  button: theme.typography.button,
  /* Styles applied to the root element if `variant="overline"`. */
  overline: theme.typography.overline,
  /* Styles applied to the root element if `variant="srOnly"`. Only accessible to screen readers. */
  srOnly: {
    position: 'absolute',
    height: 1,
    width: 1,
    overflow: 'hidden',
  },
  /* Styles applied to the root element if `whiteSpace="nowrap"`. */
  whiteSpaceNowrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the root element if `whiteSpace="pre"`. */
  whiteSpacePre: {
    whiteSpace: 'pre',
  },
  /* Styles applied to the root element if `whiteSpace="preline"`. */
  whiteSpacePreline: {
    whiteSpace: 'pre-line',
  },
  /* Styles applied to the root element if `whiteSpace="prewrap"`. */
  whiteSpacePrewrap: {
    whiteSpace: 'pre-wrap',
  },
}));

type VariantClass = 'h1' | 'h2' | 'h3' | 'body1' | 'button' | 'overline';
export type Variant =
  | 'inherit'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'button'
  | 'overline';

interface VariantToTagMapping {
  [variant: string]: React.ElementType;
}

const defaultVariantToTagMapping: VariantToTagMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'p',
  button: 'span',
  overline: 'span',
};

type WhiteSpaceClass =
  | 'whiteSpaceNowrap'
  | 'whiteSpacePre'
  | 'whiteSpacePreline'
  | 'whiteSpacePrewrap';
type WhiteSpace = 'inherit' | 'nowrap' | 'pre' | 'preline' | 'prewrap';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  color?: string | object;
  component?: React.ElementType;
  display?: string | object;
  fontStyle?: string | object;
  fontWeight?: number | string | object;
  letterSpacing?: string | object;
  lineHeight?: string | object;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  textAlign?: string | object;
  variant?: Variant;
  whiteSpace?: WhiteSpace;
}

const Typography: React.FC<TypographyProps> = props => {
  const {
    children,
    className,
    color,
    component,
    display,
    fontStyle,
    fontWeight = 400,
    letterSpacing = 'normal',
    lineHeight = 1,
    onClick,
    textAlign,
    variant = 'body1',
    whiteSpace = 'inherit',
  } = props;

  const Component: React.ElementType =
    component || defaultVariantToTagMapping[variant] || 'span';

  const classes = useStyles();

  return (
    <Box
      className={clsx(
        classes.root,
        {
          [classes[variant as VariantClass]]: variant !== 'inherit',
          [classes[`whiteSpace${capitalize(whiteSpace)}` as WhiteSpaceClass]]:
            whiteSpace !== 'inherit',
        },
        className
      )}
      color={color}
      component={Component}
      display={display}
      fontStyle={fontStyle}
      fontWeight={fontWeight}
      letterSpacing={letterSpacing}
      lineHeight={lineHeight}
      onClick={onClick}
      textAlign={textAlign}
    >
      {children}
    </Box>
  );
};

export default Typography;
