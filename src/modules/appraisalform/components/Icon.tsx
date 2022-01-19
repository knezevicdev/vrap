import React, { forwardRef } from 'react';

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

export default Icon;
