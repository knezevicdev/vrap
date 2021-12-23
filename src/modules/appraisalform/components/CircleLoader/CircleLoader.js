import React from 'react';
import PropTypes from 'prop-types';

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

CircleLoader.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

CircleLoader.defaultProps = {
  className: '',
  isLoading: false
};

export default CircleLoader;
