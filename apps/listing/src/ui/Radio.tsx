import Radio, { RadioProps } from '@material-ui/core/Radio';
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
    border: '1px solid #041022',
    borderRadius: '50%',
    width: 21,
    height: 21,
    backgroundColor: '#ffffff',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '1px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:disabled ~ &': {
      background: 'rgba(4, 16, 34, 0.1)',
    },
  },
  checkedIcon: {
    border: '1px solid #E7131A',
    backgroundColor: '#ffffff',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 19,
      height: 19,
      backgroundImage: 'radial-gradient(#E7131A, #E7131A 43%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      border: '1px solid #d40b11',
      '&:before': {
        backgroundImage:
          'radial-gradient(#d40b11, #d40b11 43%,transparent 32%)',
      },
    },
  },
});

enum ColorEnum {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export default function CustomRadio(props: RadioProps): JSX.Element {
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
    <Radio
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
