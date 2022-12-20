import React from 'react';

import View from './View';

interface Props {
  hasOverlay?: boolean;
}

const Footer: React.FC<Props> = ({ hasOverlay = false }) => {
  return <View hasOverlay={hasOverlay} />;
};

export default Footer;
