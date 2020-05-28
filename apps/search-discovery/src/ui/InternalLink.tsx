import {
  default as MuiLink,
  LinkProps as MuiLinkProps,
} from '@material-ui/core/Link';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

type MuiLinkPropsWithoutHref = Omit<MuiLinkProps, 'href'>;

interface InternalLinkProps extends NextLinkProps, MuiLinkPropsWithoutHref {
  className?: string;
}

const InternalLink = React.forwardRef<HTMLAnchorElement, InternalLinkProps>(
  (
    {
      as,
      color,
      children,
      className,
      href,
      prefetch,
      rel,
      replace,
      scroll,
      shallow,
      target,
      TypographyClasses,
      underline,
      variant,
    },
    ref
  ) => {
    return (
      <NextLink
        as={as}
        href={href}
        passHref={true}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
      >
        <MuiLink
          className={className}
          color={color}
          rel={rel}
          ref={ref}
          target={target}
          TypographyClasses={TypographyClasses}
          underline={underline}
          variant={variant}
        >
          {children}
        </MuiLink>
      </NextLink>
    );
  }
);

InternalLink.displayName = 'InternalLink';

export default InternalLink;
