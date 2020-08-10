import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const PictureView: React.FC<Props> = ({ children, viewModel }) => {
  const { webp, jp2 } = viewModel.get();
  return (
    <picture className={viewModel.className}>
      <source type="image/webp" srcSet={webp} />
      <source type="image/jp2" srcSet={jp2} />
      {children}
    </picture>
  );
};

export default PictureView;
