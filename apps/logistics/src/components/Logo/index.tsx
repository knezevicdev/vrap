import React from 'react';

import View, { Props as ViewProps } from './View';

import mvvm, { Model } from 'src/mvvm';

interface Props {
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const viewModel = ({
  props: { className, href, onClick },
}: Model<void, Props, void>): ViewProps => ({
  onClick: (e: React.MouseEvent<HTMLAnchorElement>): void =>
    onClick && onClick(e),
  className: className || '',
  href: href || '/',
});

const Logo = mvvm({ viewModel, View });

export default Logo;
