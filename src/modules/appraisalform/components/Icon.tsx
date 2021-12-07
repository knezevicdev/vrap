import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Icon = forwardRef(
  ({ onClick, onMouseEnter, className, id, fill, width, height }, ref) => {
    if (typeof document !== 'undefined') {
      const iconID = id.default;
      const w = width ? width : iconID.viewBox.split(' ').splice(-2)[0];
      const h = height ? height : iconID.viewBox.split(' ').splice(-2)[1];
      const iconIdent = `#${iconID.id}`;

      return (
        <svg
          ref={ref}
          className={`svg` + (className ? ` ${className}` : '')}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          viewBox={iconID.viewBox}
          width={w}
          height={h}
          fill={fill}
        >
          <use xlinkHref={iconIdent} />
        </svg>
      );
    }
    return null;
  }
);

Icon.displayName = 'Icon';

Icon.defaultProps = {
  onClick: () => {},
  onMouseEnter: () => {},
  fill: '#58595b',
  stroke: '#58595b'
};

Icon.propTypes = {
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  children: PropTypes.node
};

export default Icon;
