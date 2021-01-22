import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    padding: '2px',
  },
  icon: {
    width: 20,
    height: 20,
    border: '1px solid #041022',
    backgroundColor: '#ffffff',
    'input:disabled ~ &': {
      border: '1px solid rgba(0, 0, 0, 0.23)',
      background: 'rgba(4, 16, 34, 0.1)',
    },
  },
  checkedIcon: {
    backgroundColor: '#E7131A',
    border: '1px solid #E7131A',
    '&:before': {
      width: '24px',
      height: '25px',
      backgroundRepeat: 'no-repeat',
      content: '""',
      display: 'block',
      backgroundPosition: '2px center',
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%2020%2016%22%20style%3D%22enable-background%3Anew%200%200%2012%209%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cstyle%20type%3D%22text%2Fcss%22%3E%0A%09.st0%7Bfill%3A%23FFFFFF%3B%7D%0A%3C%2Fstyle%3E%0A%3Cpolygon%20class%3D%22st0%22%20points%3D%2212%2C1.7%2010.2%2C0%204.2%2C5.6%201.8%2C3.4%200%2C5.1%204.2%2C9%204.2%2C9%204.2%2C9%20%22%2F%3E%0A%3C%2Fsvg%3E")',
    },
    'input:hover ~ &': {
      backgroundColor: '#d40b11',
      border: '1px solid #d40b11',
    },
  },
});

enum ColorEnum {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export default function CustomCheckbox(props: CheckboxProps): JSX.Element {
  const classes = useStyles();

  const {
    className = classes.root,
    disableRipple = true,
    color = ColorEnum.DEFAULT,
    checkedIcon = <span className={clsx(classes.icon, classes.checkedIcon)} />,
    icon = <span className={classes.icon} />,
    inputProps = { 'aria-label': 'decorative checkbox' },
  } = props;

  return (
    <Checkbox
      {...props}
      className={className}
      disableRipple={disableRipple}
      color={color}
      checkedIcon={checkedIcon}
      icon={icon}
      inputProps={inputProps}
    />
  );
}
