import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Logo: React.FC<Props> = ({ className, href, onClick }) => {
  const viewModel = new ViewModel({
    className,
    href,
    onClick,
  });
  return <View viewModel={viewModel} />;
};

export default Logo;
