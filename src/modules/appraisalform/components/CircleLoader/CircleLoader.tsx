import React from 'react';

export interface Props {
  isLoading: boolean;
  className?: string;
}

export const CircleLoader: React.FC<Props> = ({ isLoading, className }) => {
  return (
    <div
      className={['circle-loader', className, isLoading ? '' : 'load-complete']
        .filter((el) => el)
        .join(' ')}
      data-qa="CircleLoaderComponent"
    >
      <div className="checkmark draw" />
    </div>
  );
};

export default CircleLoader;
