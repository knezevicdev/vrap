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
    border: '2px solid rgba(0, 0, 0, 0.23)',
    backgroundColor: '#ffffff',
    'input:hover ~ &': {
      border: '2px solid #041022',
    },
    'input:disabled ~ &': {
      border: '2px solid rgba(0, 0, 0, 0.23)',
      background: 'rgba(4, 16, 34, 0.1)',
    },
  },
  checkedIcon: {
    backgroundColor: '#E7131A',
    border: '2px solid #E7131A',
    '&:before': {
      display: 'block',
      width: 17,
      height: 17,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#d40b11',
      border: '2px solid #d40b11',
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
