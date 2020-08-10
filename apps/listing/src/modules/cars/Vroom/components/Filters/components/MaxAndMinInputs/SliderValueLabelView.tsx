import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

const StyledToolTip = withStyles({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid #dadde9',
  },
})(Tooltip);

const SliderValueLabelView = (props: Props): JSX.Element => {
  const { children, open, value } = props;

  return (
    <StyledToolTip
      open={open}
      enterTouchDelay={0}
      placement="bottom"
      title={value}
    >
      {children}
    </StyledToolTip>
  );
};

export default SliderValueLabelView;
