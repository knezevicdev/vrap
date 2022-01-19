import React from 'react';

export const CircleLoader = ({ isLoading, className }) => {
  return (
    <div
      className={['circle-loader', className, isLoading ? '' : 'load-complete']
        .filter(el => el)
        .join(' ')}
      data-qa="CircleLoaderComponent"
    >
      <div className="checkmark draw" />
    </div>
  );
};

export default CircleLoader;
