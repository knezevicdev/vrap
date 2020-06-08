import React from 'react';

// import View from './View';
import ViewModel from './ViewModel';

interface Props {
  src: string;
  className?: string;
}

const Picture: React.FC<Props> = ({ children, src, className }) => {
  const viewModel = new ViewModel(src);
  const { webp, jp2 } = viewModel.get();
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webp} />
      <source type="image/jp2" srcSet={jp2} />
      {children}
    </picture>
  );
};

export default Picture;
